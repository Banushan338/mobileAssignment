const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized. Token missing." });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const normalizedUserId = decoded?.userId || decoded?.id || decoded?._id || decoded?.sub;
    if (!normalizedUserId) {
      return res.status(401).json({ message: "Invalid token payload." });
    }

    req.user = {
      ...decoded,
      userId: normalizedUserId,
      id: normalizedUserId,
      role: String(decoded?.role || "").toLowerCase()
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

const adminOnly = (req, res, next) => {
  const role = String(req.user?.role || "").toLowerCase();
  if (role !== "admin") {
    return res.status(403).json({ message: "Admin access only." });
  }
  next();
};

const studentOnly = (req, res, next) => {
  const role = String(req.user?.role || "").toLowerCase();
  if (role !== "student") {
    return res.status(403).json({ message: "Student access only." });
  }
  next();
};

module.exports = { protect, adminOnly, studentOnly };
