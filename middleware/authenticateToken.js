const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.headers["authorization"];

  // Check if token exists
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    // Verify and decode token
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

    // Attach decoded user ID to req object
    req.userId = decoded.id;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors
    res.status(401).json({ message: "Failed to authenticate token" });
  }
};
