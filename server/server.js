require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./Database/connect");
const authRouter = require("./Router/authRouter");
const userRouter = require("./Router/userRouter");

const adminRouter = require("./Router/adminRouter");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/Wealth-View/v1/auth", authRouter);
app.use("/Wealth-View/v1/userin", userRouter);
app.use("/Wealth-View/v1", adminRouter);
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("db connected");
    app.listen(port, console.log(`server listening at port ${port}`));
  } catch (error) {
    console.error(error);
  }
};

start();
