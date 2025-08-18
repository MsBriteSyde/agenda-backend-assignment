import express from "express";
import {
  getEmployee,
  postEmployee,
  deleteEmployee,
  putEmployee,
} from "../controllers/employeeController.js";

export const employee = express.Router();

employee.get("/employee/", getEmployee);
employee.post("/employee/", postEmployee);
employee.delete("/employee/:employee_id", deleteEmployee);
employee.put("/employee/:employee_id", putEmployee);
