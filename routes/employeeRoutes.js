import { Router } from "express";
import { pool } from "../db/db.js";
import {
  getEmployee,
  postEmployee,
  deleteEmployee,
  putEmployee,
} from "../controllers/employeeController.js";

const router = Router();

router.get("/", getEmployee);
router.post("/", postEmployee);
router.put("/:id", putEmployee);
router.delete("/:id", deleteEmployee);

export default router;
