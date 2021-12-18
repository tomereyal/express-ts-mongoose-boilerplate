import dotenv from "dotenv";

dotenv.config();

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  wtimeoutMS: 30000,
  keepAlive: true,
  maxPoolSize: 50,
  autoIndex: false,
  retryWrites: false,
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || "myusername";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "mypassword12345";
const MONGO_HOST =
  process.env.MONGO_HOST ||
  "cluster0.nhqsx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const MONGO = {
  host: MONGO_HOST,
  username: MONGO_USERNAME,
  password: MONGO_PASSWORD,
  options: MONGO_OPTIONS,
  url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`,
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 4000;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const config = {
  mongo: MONGO,
  server: SERVER,
};

export default config;
