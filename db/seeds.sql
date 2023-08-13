-- Insert some sample departments for testing.
INSERT INTO department (id, name)
VALUES
  		(1, 'business'),
		(2, 'production'),
		(3, 'development'),
		(4, 'marketing');


-- Insert some sample roles for testing.
INSERT INTO role (id, title, salary, department_id)
VALUES
  		(1, 'porduct owner', 500, 1),
		(2, 'production support', 600, 2),
		(3, 'software developer', 300, 3),
		(4, 'marketing manager', 700, 4);														




-- Insert some sample employees for testing.
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
  	(1, 'James', 'Liu', 1, NULL),
  	(2, 'Emma', 'Lin', 2, 1),
  	(3, 'William', 'Ke', 3, 2),
	(4, 'Olivia', 'Chang', 4, 3);												