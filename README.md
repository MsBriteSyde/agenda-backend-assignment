Pathway 4

Phase 1: Database Design (PostgreSQL on RDS)
Schema Overview:

employee table: employee_id (Primary Key) name department role tasks table: task_id (Primary Key) description status employee_id (Foreign Key referencing employee.employee_id)

SQL Setup:

CREATE TABLE employee (
  employee_id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  department VARCHAR(100),
  role VARCHAR(100)
);

CREATE TABLE tasks (
  task_id SERIAL PRIMARY KEY,
  description TEXT,
  status VARCHAR(50),
  employee_id INTEGER REFERENCES employee(employee_id) ON DELETE CASCADE
);
Phase 2: API Development (Node.js + Express)
Project Structure:

agenda-back-end/
├── controllers/
│   ├── employeeController.js
│   └── taskController.js
├── routes/
│   ├── employeeRoutes.js
│   └── taskRoutes.js
├── db.js
├── app.js
└── package.json
Key Endpoints:
GET /employees – Fetch all employees

POST /employees – Add new employee

PUT /employees/:id – Update employee

DELETE /employees/:id – Delete employee

GET /tasks – Fetch all tasks

POST /tasks – Add task (with employee_id)

PUT /tasks/:id – Update task

DELETE /tasks/:id – Delete task

Phase 3: Hosting on RDS & EC2
RDS Setup:

Create a new schema for this project.

Use pg in Node.js to connect.