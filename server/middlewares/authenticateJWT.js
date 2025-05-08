import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwt_secret);
    console.log("Decoded User ID from JWT:", decoded); 
    req.user = { _id: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};
