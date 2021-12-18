import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import Topic from "../schemas/topic.model";
import { ok, err } from "../_helpers";
const NAMESPACE = "Controllers topic.ts";

const getAllTopics = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "getAllTopics function called");

  Topic.find()
    .exec()
    .then((topics) => {
      ok(res, { topics }, true);
    })
    .catch((error) => err(res, error));
};

const createTopic = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "createTopic function called");

  const newTopic = new Topic({ name: req.body.name, author: "Luke Skywalker" });

  newTopic
    .save()
    .then((newTopic) => {
      ok(res, { newTopic }, true);
    })
    .catch((error) => err(res, error));
};

export default { getAllTopics, createTopic };
