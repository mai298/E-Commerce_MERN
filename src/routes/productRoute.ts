import express from "express";
import { getAllProducts } from "../controller/productController";

const productRoute = express.Router();

productRoute.get("/", async (req, res) => {
  const product = await getAllProducts();
  res.status(200).send(product);
});
export default productRoute;
