import express from 'express';
const app = express();
const port = 4000;
import {employee}  from './routes/employeeRoutes.js';
import {tasks} from './routes/taskRoutes.js';

app.use(express.json());

app.use('/api/', employee);
app.use('/api/', tasks);
app.listen(port, () => {

  console.log(`Server is running on http://localhost:${port}`)
})