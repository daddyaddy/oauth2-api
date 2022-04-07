import { Document } from "mongoose";

export default class AccountDocument extends Document {
  _id;
  user;
  credentials;
}
