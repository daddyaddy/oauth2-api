import AccountMongoModel from "../models/account";

export const checkToken = async (req, res, next) => {
  const { query } = req;
  const { access_token } = query;

  if (!access_token) return next(Error("'access_token' is undefined"));

  const account = await AccountMongoModel.findOne({
    "credentials.access_token": access_token,
  });
  if (!account) return next(Error("'access_token' is invalid"));
  const { expiry_date } = account.credentials;
  const now = Date.now();
  if (parseInt(expiry_date) < now)
    return next(Error("'access_token' has expired"));
  req.account = account;
  next();
};
