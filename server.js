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
inquirer
		.prompt([
		{
			// List type to allow user for choosing between options.
			type: 'list',
			name: 'action',
			message: 'What would you like to do?',
			choices: [
			
			'View ALL Employees.',
            'Add Employee.',
            'Update Employee Role.',
            'View ALL Roles.',
            'Add Role.',
            'View ALL Departments.',
			'Add Department.',
			
			],
		},
		])
    	// Then function to pass user inputs as answer param.
		.then((answer) => {
		// Call respective functions based on user's choice through param.
		switch (answer.action) {
            case 'View ALL Employees.':
			ViewAllEmployees();
            break;

            case 'Add Employee.':
			AddEmployee();
			break;

            case 'Update Employee Role.':
			UpdateEmployeeRole();
			break;

            case 'View ALL Roles.':
			ViewAllRoles();
			break;

            case 'Add Role.':
			AddRole();
			break;

			case 'View ALL Departments.':
			ViewAllDepartments();
			break;
			
			case 'Add Department.':
			AddDepartment();
			break;
			
			default:
			console.log('Invalid choice! Please select again...');
			break;
		}
		})
		// Catch function for any potential errors.
		.catch((error) => {
			console.log('An error occurred:', error);
			connection.end();
		});



// Start the server.
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
