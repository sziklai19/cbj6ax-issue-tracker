import { RequestHandler } from "express-serve-static-core";
import { UserRole } from "../entities/user";

export function authorize(role: UserRole): RequestHandler {
  return (req, res, next) => {
    if (req.user?.role === role) {
      return next();
    }
    return res.sendStatus(403);
  }
}
