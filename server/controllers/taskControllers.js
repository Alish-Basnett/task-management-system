const db = require("../models/db");

// Controller methods
const getAllTasks = (req, res) => {
  db.query("SELECT * FROM Tasks", (error, results) => {
    if (error) throw error;
    res.json(results);
  });
};

const getTaskById = (req, res) => {
  const taskId = req.params.id;
  db.query(
    "SELECT * FROM Tasks WHERE task_id = ?",
    taskId,
    (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).send("Task not found");
      }
    }
  );
};

const createTask = (req, res) => {
  const { title, description, status, priority, due_date, user_id } = req.body;
  const newTask = { title, description, status, priority, due_date, user_id };
  db.query("INSERT INTO Tasks SET ?", newTask, (error, result) => {
    if (error) throw error;
    res.status(201).send("Task added successfully");
  });
};

const updateTask = (req, res) => {
  const taskId = req.params.id;
  const { title, description, status, priority, due_date, user_id } = req.body;
  const updatedTask = {
    title,
    description,
    status,
    priority,
    due_date,
    user_id,
  };
  db.query(
    "UPDATE Tasks SET ? WHERE task_id = ?",
    [updatedTask, taskId],
    (error, result) => {
      if (error) throw error;
      res.send("Task updated successfully");
    }
  );
};

const deleteTask = (req, res) => {
  const taskId = req.params.id;
  db.query("DELETE FROM Tasks WHERE task_id = ?", taskId, (error, result) => {
    if (error) throw error;
    res.send("Task deleted successfully");
  });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
