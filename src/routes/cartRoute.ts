import express from "express";
import {
  addItemToCart,
  getActiveCartForUser,
} from "../controller/cartContoller";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";

const cartRoute = express.Router();

cartRoute.get("/", validateJWT, async (req: ExtendRequest, res: any) => {
  const userId = req?.user?._id;
  const cart = await getActiveCartForUser({ userId: userId });
  res.status(200).send(cart);
});

cartRoute.post("/items", validateJWT, async (req: ExtendRequest, res: any) => {
  const userId = req?.user?._id;
  const { productId, quantity } = req.body;
  const response = await addItemToCart({ userId, productId, quantity });
  res.status(response.statusCode).send(response.data);
});
export default cartRoute;
