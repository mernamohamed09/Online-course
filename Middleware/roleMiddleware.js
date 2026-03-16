const jwt = require("jsonwebtoken");

    const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {

    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ msg: "Access denied" });
    }

    next();
  };
};

module.exports = roleMiddleware;