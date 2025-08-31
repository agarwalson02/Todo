import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRouter from "./routes/todo.route.js";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const DB_URL = process.env.MONGO_DB_URL;

// database connection
try {
  await mongoose.connect(DB_URL);
  console.log("Connected to mongodb");
} catch (error) {
  console.log(error);
}

//routes
app.use(express.json());
app.use("/todo", todoRouter);

app.listen(PORT, () => {
  console.log("Server is listening");
});
