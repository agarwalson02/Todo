import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRouter from "./routes/todo.route.js";
import userRoutere from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const DB_URL = process.env.MONGO_DB_URL;

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// database connection
try {
  await mongoose.connect(DB_URL);
  console.log("Connected to mongodb");
} catch (error) {
  console.log(error);
}

//routes

app.use("/todo", todoRouter);
app.use("/user", userRoutere);

app.listen(PORT, () => {
  console.log("Server is listening");
});
