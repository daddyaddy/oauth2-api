import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import database from "../modules/database";
import { errorHandler } from "../middlewares/error-handler";
import { accountsRouter } from "../api/accounts/accounts.routes";

class App {
  app = undefined;

  constructor() {}

  async run() {
    await this.runApp();
  }

  async runApp() {
    const lastRun = new Date();
    this.app = express();
    this.app.use(helmet());
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ extended: false }));

    this.app.use("*", (req, res, next) => {
      global.log("New request");
      next();
    });

    this.app.use("/accounts", accountsRouter);
    this.app.get("/healthcheck", (req, res, next) => {
      res.json({
        status: "success",
        payload: {
          databaseStatus: database.getStatus(),
          environment: process.env.NODE_ENV,
          version,
          lastRun,
        },
      });
      next();
    });
    this.app.use(errorHandler);
  }
}

export default new App();
