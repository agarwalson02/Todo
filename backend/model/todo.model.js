import mongoose from "mongoose";
const todo_Schema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});
const Todo = mongoose.model("Todo", todo_Schema);
export default Todo;
