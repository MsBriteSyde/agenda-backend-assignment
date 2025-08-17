import { pool } from "../db/db.js";

export const getEmployee = async (req, res) => {
  try {
    const sql = `select * from agenda.employee`;
    const result = await pool.query(sql);
    return res.json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const postEmployee = async (req, res) => {
  try {
    const sql = `insert into agenda.employee (name, department, role) values ($1, $2, $3) returning *`;
    const body = req.body;
    if (!body.name || !body.department || !body.role) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name, department, or role" });
    }
    const parameters = [body.name, body.department, body.role];
    const result = await pool.query(sql, parameters);
    return res
      .status(201)
      .json({
        message: "Employee created successfully",
        employee: result.rows[0],
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//delete employee
export const deleteEmployee = async (req, res) => {
  try {
    const sql = `delete from agenda.employee where employee_id = $1 returning *`;
    const employee_id = req.params.employee_id;
    if (!employee_id) {
      return res
        .status(400)
        .json({ error: "employee_id parameter is required" });
    }
    const result = await pool.query(sql, [employee_id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    return res.json({
      message: "Employee deleted successfully",
      employee: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const putEmployee = async (req, res) => {
  try {
    const sql = `update agenda.employee set name = $1, department = $2, role = $3 where employee_id = $4 returning *`;
    const body = req.body;
    const employee_id = req.params.employee_id;
    if (!employee_id) {
      return res
        .status(400)
        .json({ error: "employee_id parameter is required" });
    }
    const parameters = [body.name, body.department, body.role, employee_id];
    const result = await pool.query(sql, parameters);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    return res.json({
      message: "Employee updated successfully",
      employee: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
