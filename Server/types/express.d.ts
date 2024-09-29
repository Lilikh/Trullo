
import { JwtPayload } from "jsonwebtoken";  // Import the JwtPayload type from jsonwebtoken

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;  // You can adjust the type based on your payload (string or JwtPayload)
    }
  }
}
