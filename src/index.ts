import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import { seedInitialProducts } from "./controller/productController";
import cartRoute from "./routes/cartRoute";
const app = express();
const port = 3001;
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/ecommerce").then(() => {
  console.log("connected");
});
//seeder
seedInitialProducts();

//routes
app.use("/user", userRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
