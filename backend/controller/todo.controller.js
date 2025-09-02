import Todo from "../model/todo.model.js";

export const create_Todo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json({ message: "Todo Created", newTodo });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error creating todo" });
  }
};

export const get_todo = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(201).json({ message: "Todo Fetched", todos });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error fetching todo" });
  }
};

export const update_todo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({ message: "Todo Updated", todo });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error updating todo" });
  }
};

export const delete_todo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not exist" });
    }
    res.status(201).json({ message: "Todo Deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error deleting todo" });
  }
};
