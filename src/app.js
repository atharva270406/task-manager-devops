const express = require("express");

const app = express();

app.use(express.json());

let tasks = [
  { id: 1, title: "Set up Jenkins", completed: false },
  { id: 2, title: "Run automated tests", completed: false }
];

let nextId = 3;

app.get("/", (req, res) => {
  res.json({
    message: "Task Manager API is running",
    version: "1.0.0"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "task-manager-api"
  });
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((item) => item.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Task title is required" });
  }

  const task = {
    id: nextId++,
    title: title.trim(),
    completed: false
  };

  tasks.push(task);
  res.status(201).json(task);
});

app.put("/tasks/:id", (req, res) => {
  const task = tasks.find((item) => item.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  if (typeof req.body.title === "string" && req.body.title.trim()) {
    task.title = req.body.title.trim();
  }

  if (typeof req.body.completed === "boolean") {
    task.completed = req.body.completed;
  }

  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  const exists = tasks.some((item) => item.id === taskId);

  if (!exists) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks = tasks.filter((item) => item.id !== taskId);
  res.status(204).send();
});

module.exports = app;
