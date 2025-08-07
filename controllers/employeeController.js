const pool = require('../db');

exports.getAllEmployees = async (req, res) => {
  const result = await pool.query('SELECT * FROM employee');
  res.json(result.rows);
};

exports.addEmployee = async (req, res) => {
  const { name, department, role } = req.body;
  const result = await pool.query(
    'INSERT INTO employee (name, department, role) VALUES ($1, $2, $3) RETURNING *',
    [name, department, role]
  );
  res.status(201).json(result.rows[0]);
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, department, role } = req.body;
  const result = await pool.query(
    'UPDATE employee SET name = $1, department = $2, role = $3 WHERE employee_id = $4 RETURNING *',
    [name, department, role, id]
  );
  res.json(result.rows[0]);
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM employee WHERE employee_id = $1', [id]);
  res.sendStatus(204);
};