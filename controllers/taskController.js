const pool = require('../db');

exports.getAllTasks = async (req, res) => {
  const result = await pool.query('SELECT * FROM tasks');
  res.json(result.rows);
};

exports.addTask = async (req, res) => {
  const { description, status, employee_id } = req.body;
  const result = await pool.query(
    'INSERT INTO tasks (description, status, employee_id) VALUES ($1, $2, $3) RETURNING *',
    [description, status, employee_id]
  );
  res.status(201).json(result.rows[0]);
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { description, status } = req.body;
  const result = await pool.query(
    'UPDATE tasks SET description = $1, status = $2 WHERE task_id = $3 RETURNING *',
    [description, status, id]
  );
  res.json(result.rows[0]);
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM tasks WHERE task_id = $1', [id]);
  res.sendStatus(204);
};