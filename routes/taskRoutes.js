import express from "express";
import {
  getTasks,
  postTasks,
  deleteTasks,
  putTasks,
} from "../controllers/taskController.js";

export const tasks = express.Router();

tasks.get("/tasks/", getTasks);
tasks.post("/tasks/", postTasks);
tasks.delete("/tasks/:id", deleteTasks);
tasks.put("/tasks/:id", putTasks);
