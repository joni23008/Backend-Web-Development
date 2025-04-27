

module.exports = (req, res, next) => {
  res.locals.user = req.user || null; // Attach the logged-in user (or null if not logged in)
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.info = req.flash("info");
  next();
};