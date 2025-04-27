function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next(); // OK, move to the controller
  }

  // If not logged in
  return res.status(401).json({ message: "Not allowed, not logged in" });
}

module.exports = { ensureLoggedIn };
