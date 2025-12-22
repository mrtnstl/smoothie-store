module.exports.accessControlMW = allowedRolesArray => {
  return (req, res, next) => {
    console.log("accessControlMW", "allowed roles:", allowedRolesArray.join());
    return next();
  };
};
