import http from "http";
import express from "express";
import bodyParser from "body-parser";
import logging from "./config/logging";
import config from "./config/config";
import topicRoutes from "./routes/topic";
import mongoose from "mongoose";

const NAMESPACE = "Server";
const router = express();

/**CONNECT TO MONGO */

mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then((result) => {
    logging.info(NAMESPACE, "connected to mongoDB~!");
  })
  .catch((error) => {
    logging.error(NAMESPACE, error.message, error);
  });

/** LOGGING THE REQUEST */

router.use((req, res, next) => {
  logging.info(
    NAMESPACE,
    `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
  );
  res.on("finish", () => {
    logging.info(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
    );
  });
  next();
});

//parse incoming req data
router.use(bodyParser.urlencoded({ extended: false }));
//JSON every response we send back
router.use(bodyParser.json());

//this allows for requests to come from ANYWHERE
//usually we remove this in production and predefine a list of IP adresseses that we validate as safe..
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-with, Content-Type, Accept, Authorization"
  );

  //this is for specifing which methods we allow.. when working with other coders on the project
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST PUT");
    return res.status(200).json({});
  }
  next();
});

/**ROUTES */

router.use("/api/topics", topicRoutes);

/**ERROR HANDLING */
router.use((req, res, next) => {
  const error = new Error("not found");

  return res.status(404).json({ message: error.message });
});

/**CREATE SERVER */

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => {
  logging.info(
    NAMESPACE,
    `Server running on ${config.server.hostname}:${config.server.port}`
  );
});
