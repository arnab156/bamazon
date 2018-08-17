DROP DATABASE IF EXISTS departmentsDB;
CREATE DATABASE departmentsDB;



CREATE TABLE departments(
   department_id VARCHAR(100)  NULL,
   department_name VARCHAR(100)  NULL,
   overheads DECIMAL(10,2) NULL
);


USE departmentsDB;

ALTER TABLE departments
ADD total_profit DECIMAL(10,2) NULL;


SELECT * FROM departments;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Letmein@156';