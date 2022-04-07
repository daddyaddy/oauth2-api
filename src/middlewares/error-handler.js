export const errorHandler = (err, req, res, next) => {
  global.err(err);
  if (!err) return next();
  if (!err.statusCode) err.statusCode = 500;
  if (!err.name) err.name = "UnknownError";
  res.status(err.statusCode).send({
    status: "error",
    error: {
      name: "ApiError",
      message: err.message,
    },
  });
};
