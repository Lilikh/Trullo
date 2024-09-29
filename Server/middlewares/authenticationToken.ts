import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "fallbacksecret";  // Make sure this matches your auth routes

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];  // Token is usually in 'Bearer <token>' format

  if (!token) {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // Attach the decoded token (i.e., user data) to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
