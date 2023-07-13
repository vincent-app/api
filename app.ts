import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { config } from "dotenv";

/**
 * Import routes
 */
import index from "./routes/index";
import webhook from "./routes/webhook";

const app = express();

/**
 * Initialize dotenv
 */
config();

/**
 * Express configuration (express.json, express.urlencoded, helmet, morgan, cors)
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("tiny"));
app.use(
  cors({
    origin: "*", // Be sure to switch to your production domain
  })
);

/**
 * Set express variables
 * @param {string} host - Hostname
 * @param {number} port - Port
 */
app.set("host", process.env.HOST || "localhost");
app.set("port", process.env.PORT || 8080);

/**
 * Initialize routes
 */
app.use("/", index);
app.use("/webhook", webhook);

export default app;
