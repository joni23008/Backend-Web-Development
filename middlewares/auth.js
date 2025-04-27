// Defines middleware function to check if user has specific role
// Usage example in a route:
// router.get('/admin', checkRole('admin'), handlerFunction);
function checkRole(role) {
  return function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    }
    res.status(403).send("Access denied");
  };
}

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You must be logged in!");
  res.redirect("/auth/login");
}

module.exports = { checkRole, isAuthenticated };
