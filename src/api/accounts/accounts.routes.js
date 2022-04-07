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
  const { account } = req;
  if (!account) return next(Error("User is not logged in."));
  res.status(200).json({ status: "success", payload: { account } });
});

accountsRouter.post("/authorize", async (req, res, next) => {
  const { code } = req.body;
  if (!code) return next(Error("'code' is undefined"));

  try {
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_SECRET_ID,
      process.env.GOOGLE_REDIRECT_URI
    );
    google.options({ auth });
    const tokenResponse = await auth.getToken(code);
    if (!tokenResponse.tokens) return next(Error("'code' is invalid"));
    const { tokens: credentials } = tokenResponse;
    auth.setCredentials(credentials);

    const oauth2 = google.oauth2({ auth, version: "v2" });
    const userInfoResponse = await oauth2.userinfo.get();
    if (!userInfoResponse.data) return next(Error("'user' is not exist"));
    const { data: user } = userInfoResponse;

    const existedAccount = await AccountMongoModel.findOne({
      "user.id": user.id,
    });
    if (!existedAccount) {
      const newAccount = await new AccountMongoModel({ user, credentials });
      await newAccount.save();
    } else {
      existedAccount.credentials = credentials;
      await existedAccount.save();
    }
    res.status(200).json({ status: "success", payload: { credentials } });
  } catch (error) {
    return next(error);
  }
});
