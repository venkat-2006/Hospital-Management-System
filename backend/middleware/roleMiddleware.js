const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log("USER ROLE:", req.user.role);  // ← add this
    console.log("ALLOWED ROLES:", roles);       // ← add this

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

module.exports = authorizeRoles;