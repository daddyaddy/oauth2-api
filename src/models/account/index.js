import mongoose from "mongoose";
import { AccountMongoSchema } from "./account.mongo.schemas";
import accountsMock from "./account.mock";
import { minutes } from "../../utils";

const AccountMongoModel = mongoose.model("accounts", AccountMongoSchema);

const loadMock = async () => {
  global.log("inserting mocked accounts...");
  const accounts = [...accountsMock];
  accounts[1].credentials.expiry_date = `${Date.now() + 30 * minutes}`;
  await AccountMongoModel.insertMany(accounts);
};

loadMock();

export default AccountMongoModel;
