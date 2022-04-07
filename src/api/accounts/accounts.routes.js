import express from "express";
import AccountMongoModel from "../../models/account";
import { google } from "googleapis";
import { checkToken } from "./../../middlewares/check-token";
import dotenv from "dotenv";

dotenv.config();
export const accountsRouter = express.Router();

accountsRouter.get("/list", async (req, res, next) => {
  const accounts = await AccountMongoModel.find();
  res.status(200).json({ status: "success", payload: { accounts } });
});

accountsRouter.get("/me", checkToken, async (req, res, next) => {
  // TODO
});

accountsRouter.post("/authorize", async (req, res, next) => {
  // TODO
});
