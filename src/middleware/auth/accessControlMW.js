module.exports.accessControlMW = allowedRolesArray => {
  return async (req, res, next) => {
    if (!allowedRolesArray.includes(req.user.role)) {
      return res.status(201).json({ message: "Unauthorized request!" });
    }

    return next();
  };
};
