import express from "express";
import {
  getAllTasks,
  addNewTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getAllTasks);
router.post("/", addNewTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;

