import express from "express";
import { login, register } from "../controller/userController";

const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const { statusCode, data } = await register({
    firstName,
    lastName,
    email,
    password,
  });
  res.status(statusCode).send(data);
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { statusCode, data } = await login({ email, password });
  res.status(statusCode).send(data);
});
export default userRoute;
