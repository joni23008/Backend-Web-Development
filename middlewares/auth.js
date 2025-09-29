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

const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
  // Check Passport session (web)
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  // Check JWT token (mobile)
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    const token = authHeader.split(' ')[1]; // "Bearer <token>"
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // attach user for controller
      return next();
    } catch (err) {
      // Invalid token
      return res.status(403).json({ message: 'Invalid token' });
    }
  }

  // Neither session nor token
  // Decide based on request type:
  if (req.headers['accept'] && req.headers['accept'].includes('application/json')) {
    // API call → respond with JSON
    return res.status(401).json({ message: 'You must be logged in' });
  } else {
    // Web → redirect as before
    req.flash("error", "You must be logged in!");
    return res.redirect("/auth/login");
  }
}

module.exports = { checkRole, isAuthenticated };
