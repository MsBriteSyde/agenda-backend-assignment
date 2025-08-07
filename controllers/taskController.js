import { pool } from '../db/db.js';

export const getTasks = async (req, res) => {

  const sql = 'select * from agenda.tasks';
  const result = await pool.query(sql)
  return res.json(result.rows)
}

export const postTasks = async (req, res) => {
  const sql = 'insert into agenda.tasks (description, status, employee_id) values ($1, $2, $3)';
  const body = req.body;
  const parameters = [body.description, body.status, body.employee_id];
  await pool.query(sql, parameters);
  return res.json(req.body);
}

export const deleteTasks = async (req, res) => {

  const sql = 'delete from agenda.tasks where task_id = $1';
  const task_id = req.params.id;
  const result = await pool.query(sql, [task_id]);
  // console.log(req.params.id);
// console.log(req.params);

  const parameters = [task_id];
  //await pool.query(sql, parameters);
  return res.json({ message: 'Task deleted successfully' });

}

export const putTasks = async (req, res) => {
  const sql = 'update agenda.tasks set description = $1, status = $2, employee_id = $3 where task_id = $4';
  const body = req.body;

  const task_id = req.params.id;
  const parameter = [body.description, body.status, body.employee_id, task_id];
  const result = await pool.query(sql, parameter);
  return res.json({ message: 'Task updated successfully' });
}

