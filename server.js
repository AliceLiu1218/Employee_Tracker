const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'QPalZm1997',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);


//Add Inquirer prompts questions 
const inquirer = require('inquirer');

function start() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View ALL Employees.', 'Add Employee.', 'Update Employee Role.', 'View ALL Roles.', 'Add Role.', 'View ALL Departments.', 'Add Department.']
        })
        .then(function (answer) {
            switch (answer.action) {
                case 'View ALL Employees.':
                    viewAllEmployees();
                    break;

                case 'Add Employee.':
                    addEmployee();
                    break;

                case 'Update Employee Role.':
                    updateEmployeeRole();
                    break;

                case 'View ALL Roles.':
                    viewAllRoles();
                    break;

                case 'Add Role.':
                    addRole();
                    break;

                case 'View ALL Departments.':
                    viewAllDepartments();
                    break;

                case 'Add Department.':
                    addDepartment();
                    break;
            }
        })
}

//View ALL Employees
function viewAllEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        start();
    })
}

//Add Employee
function addEmployee() {
    inquirer

        .prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'What is the employees first name?'

            },
            {
                name: 'last_name',
                type: 'input',
                message: 'What is the employees last name?'
                
            },
            {
                name: 'role_id',
                type: 'input',
                message: 'What is the employees role id?'

            },
            {
                name: 'manager_id',
                type: 'input',
                message: 'What is the employees manager id?'

            }
        ])
        .then(function (answer) {
            db.query('INSERT INTO employee SET ?',


                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id
                },
                function (err, results) {
                    if (err) throw err;
                    console.table(results);
                    start();
                })
        })
}


//Update Employee Role
function updateEmployeeRole() {
    inquirer

        .prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'What is the employees first name?'

            },
            {
                name: 'last_name',
                type: 'input',
                message: 'What is the employees last name?'

            },
            {
                name: 'role_id',
                type: 'input',
                message: 'What is the employees role id?'

            },
            {
                name: 'manager_id',
                type: 'input',
                message: 'What is the employees manager id?'

            }
        ])
        .then(function (answer) {
            db.query('UPDATE employee SET ? WHERE ?',

                [
                    {
                        role_id: answer.role_id,
                        manager_id: answer.manager_id
                    },
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name
                    }
                ],
                function (err, results) {
                    if (err) throw err;
                    console.table(results);
                    start();
                })
        })
}

//View ALL Roles
function viewAllRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        start();
    })
}


//Add Role
function addRole() {
    inquirer


        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the title of the role?'

            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of the role?'

            },
            {
                name: 'department_id',
                type: 'input',
                message: 'What is the department id of the role?'

            }
        ])
        .then(function (answer) {
            db.query('INSERT INTO role SET ?',


                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id
                },
                function (err, results) {
                    if (err) throw err;
                    console.table(results);
                    start();
                })
        })
}

//View ALL Departments
function viewAllDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        start();
    })
}



//Add Department
function addDepartment() {
    inquirer


        .prompt([

            {
                name: 'name',
                type: 'input',
                message: 'What is the name of the department?'

            }
        ])

        .then(function (answer) {
            db.query('INSERT INTO department SET ?',


                {
                    name: answer.name

                },
                function (err, results) {
                    if (err) throw err;
                    console.table(results);
                    start();
                })
        })
}

start();


// Start the server.
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
