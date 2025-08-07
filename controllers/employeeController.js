import { pool } from '../db/db.js';

export const getEmployee = async (req, res) => {

  const sql = 'select * from agenda.employee';
  const result = await pool.query(sql)
  return res.json(result.rows)
}

export const postEmployee = async (req, res) => {
  const sql = 'insert into agenda.employee (name, department, role) values ($1, $2, $3)';
  const body = req.body;
  const parameters = [body.name, body.department, body.role];
  await pool.query(sql, parameters);
  return res.json(req.body);
}

//delete employee
export const deleteEmployee = async (req, res) => {

  const sql = 'delete from agenda.employee where employee_id = $1';
  const employee_id = req.params.id;
  const result = await pool.query(sql, [employee_id]);
  // console.log(req.params.id);
  // console.log(req.params);


const parameters = [employee_id];
  //await pool.query(sql, parameters);
  return res.json({ message: 'Employee deleted successfully' });
}

export const putEmployee = async (req, res) => {
  const sql = 'update agenda.employee set name = $1, department = $2, role = $3 where employee_id = $4';
  const body = req.body;


const employee_id = req.params.employee_id;
const parameter = [body.name, body.department, body.role, employee_id];
const result = await pool.query(sql, parameter);
return res.json({ message: 'object updated successfully' });
}
