import express from 'express';
export const tasks = express.Router();
import { getTasks, postTasks, deleteTasks, putTasks } from '../controllers/taskController.js';

tasks.get('/tasks/', getTasks);
tasks.post('/tasks/', postTasks);
tasks.delete('/tasks/:id', deleteTasks);
tasks.put('/tasks/:id', putTasks);
