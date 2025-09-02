import express from "express";
import {
  create_Todo,
  delete_todo,
  get_todo,
  update_todo,
} from "../controller/todo.controller.js";
import { authenticate } from "../middleware/authorize.js";

const router = express.Router();

router.post("/create", authenticate, create_Todo);

router.get("/fetch", get_todo);

router.put("/update/:id", update_todo);

router.delete("/delete/:id", delete_todo);

export default router;
