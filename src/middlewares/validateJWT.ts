import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";
export interface ExtendRequest extends Request {
  user?: any;
}
const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get("authorization");
  if (!authorizationHeader) {
    res.status(403).send("authorization header was not provided");
    return;
  }
  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    res.status(403).send("Bearer token was not provided");
    return;
  }
  jwt.verify(
    token,
    "igP3jCw12+UXTex4XXYcBsViucnVQV0eccSh9wTR57g+5RSmNYuHhwzHklLb2O4Y",
    async (err: any, payload: any) => {
      if (err) {
        res.status(401).send("invalid token");
        return;
      }
      if (!payload) {
        res.status(401).send("invalid token payload");
        return;
      }
      const userPayload = payload as {
        email: string;
        firstName: string;
        lastName: string;
      };
      //fetch user from db on the payload

      const user = await userModel.findOne({ email: userPayload.email });
      req.user = user;
      next();
    }
  );
};

export default validateJWT;
