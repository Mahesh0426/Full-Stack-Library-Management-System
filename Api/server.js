import express from "express";
import "dotenv/config";
import { connectToMongoDb } from "./config/dbConfig.js";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import bookRouter from "./routers/bookRouter.js";
import borrowRouter from "./routers/borrowRouter.js";
import reviewRouter from "./routers/reviewRouter.js";

const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(cors());

//middleware to parse json bodies
app.use(express.json());

//connect Mongo
connectToMongoDb();

//Routers
app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);
app.use("/api/borrow", borrowRouter);
app.use("/api/review", reviewRouter);

//start server
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running on port at http://localhost:8000/`);
});
