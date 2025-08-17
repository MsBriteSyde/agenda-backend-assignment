import { pool } from "../db/db.js";

export const getTasks = async (req, res) => {
  try {
    const sql = "select * from agenda.tasks";
    const result = await pool.query(sql);
    return res.json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const postTasks = async (req, res) => {
  try {
    const sql =
      "insert into agenda.tasks (description, status, employee_id) values ($1, $2, $3) returning *";
    const body = req.body;
    if (!body.description || !body.status || !body.employee_id) {
      return res
        .status(400)
        .json({
          error: "Missing required fields: description, status, or employee_id",
        });
    }
    const parameters = [body.description, body.status, body.employee_id];
    const result = await pool.query(sql, parameters);
    return res
      .status(201)
      .json({ message: "Task created successfully", task: result.rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTasks = async (req, res) => {
  try {
    const sql = "delete from agenda.tasks where task_id = $1 returning *";
    const task_id = req.params.id;
    if (!task_id) {
      return res.status(400).json({ error: "task_id parameter is required" });
    }
    const result = await pool.query(sql, [task_id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.json({
      message: "Task deleted successfully",
      task: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const putTasks = async (req, res) => {
  try {
    const sql =
      "update agenda.tasks set description = $1, status = $2, employee_id = $3 where task_id = $4 returning *";
    const body = req.body;
    const task_id = req.params.id;
    if (!task_id) {
      return res.status(400).json({ error: "task_id parameter is required" });
    }
    const parameters = [
      body.description,
      body.status,
      body.employee_id,
      task_id,
    ];
    const result = await pool.query(sql, parameters);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.json({
      message: "Task updated successfully",
      task: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
