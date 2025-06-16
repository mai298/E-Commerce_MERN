import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
const app = express();
const port = 3001;
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/ecommerce").then(() => {
  console.log("connected");
});

app.use("/user", userRoute);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
