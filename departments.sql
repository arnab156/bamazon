DROP DATABASE IF EXISTS departmentsDB;
CREATE DATABASE departmentsDB;

USE departmentsDB;

CREATE TABLE departments(
   department_id VARCHAR(100) NOT NULL,
   department_name VARCHAR(100) NOT NULL,
   overheads DECIMAL(10,2) NULL
);

SELECT * FROM departments;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Letmein@156';