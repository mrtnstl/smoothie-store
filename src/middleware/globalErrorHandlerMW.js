module.exports.globalErrorHandlerMW = (err, req, res) => {
  console.log("GLOBAL ERROR HANDLER", err);
  return res
    .status(500)
    .json({ message: `Unhandled exception! ${err.message}` });
};
