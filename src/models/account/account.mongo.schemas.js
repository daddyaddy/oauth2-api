import mongoose from "mongoose";

export const AccountUserMongoSchema = new mongoose.Schema({
  id: { type: String, required: false },
  email: { type: String, required: false },
  verified_email: { type: Boolean, required: false },
  name: { type: String, required: false },
  give_name: { type: String, required: false },
  family_name: { type: String, required: false },
  picture: { type: String, required: false },
  locale: { type: String, required: false },
});

export const AccountCredentialsMongoSchema = new mongoose.Schema({
  refresh_token: { type: String, required: false },
  expiry_date: { type: String, required: false },
  access_token: { type: String, required: false },
  token_type: { type: String, required: false },
  id_token: { type: String, required: false },
  scope: { type: String, required: false },
});

export const AccountMongoSchema = new mongoose.Schema({
  user: { type: AccountUserMongoSchema, required: false },
  credentials: { type: AccountCredentialsMongoSchema, required: false },
});
