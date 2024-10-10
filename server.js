const fs = require("fs");
const express = require("express");

const port = 3000;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Method: ${req.method}, Path: ${req.path}`);
  next();
});

app.get("/todos", (req, res) => {
  const todos = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  res.json(todos);
});

app.post("/add", (req, res) => {
  const newTodo = req.body;

  const todos = getTodos();

  todos.push(newTodo);

  saveTodos(todos);

  res.status(201).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const updatedTodo = req.body;

  const todos = getTodos();
  const todoIndex = todos.findIndex(
    (todo) => parseInt(todo.id) === parseInt(id)
  );

  if (todoIndex !== -1) {
    todos[todoIndex] = updatedTodo;
  }
  saveTodos(todos);
  res.json(todos[todoIndex]);
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todos = getTodos();
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos(todos);
  res.send(204);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

function getTodos() {
  return JSON.parse(fs.readFileSync("data.json", "utf-8"));
}

function saveTodos(todos) {
  fs.writeFileSync("data.json", JSON.stringify(todos));
}
