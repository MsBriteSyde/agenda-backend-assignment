import express from 'express';
export const employee = express.Router();
import { getEmployee, postEmployee, deleteEmployee, putEmployee } from '../controllers/employeeController.js'; 

employee.get('/employee/', getEmployee );
employee.post('/employee/', postEmployee );
employee.delete('/employee/:id', deleteEmployee);
employee.put('/employee/:id', putEmployee);
