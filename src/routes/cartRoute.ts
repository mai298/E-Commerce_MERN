import express from "express";
import { getActiveCartForUser } from "../controller/cartContoller";
import validateJWT, { ExtendRequest } from "../middlewares/validateJWT";

const cartRoute = express.Router();

cartRoute.get("/", validateJWT, async (req: any, res: any) => {
  const userId = req?.user?._id;
  const cart = await getActiveCartForUser({ userId: userId });
  res.status(200).send(cart);
});

export default cartRoute;
