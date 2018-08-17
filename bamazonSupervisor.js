




//    | department_id | department_name | over_head_costs | product_sales | total_profit |
//    | ------------- | --------------- | --------------- | ------------- | ------------ |
//    | 01            | Electronics     | 10000           | 20000         | 10000        |
//    | 02            | Clothing        | 60000           | 100000        | 40000        |

// * Hint: You may need to look into aliases in MySQL.

// * Hint: You may need to look into GROUP BYs.

// * Hint: You may need to look into JOINS.

// * **HINT**: There may be an NPM package that can log the table to the console. What's is it? Good question :)

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Letmein@156",
    database: "bamazonDB"
  });


connection.connect(function(error) {
    if(!!error){
        console.log("Error!" + error);
    } 
}); 



var connection2 = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Letmein@156",
    database: "departmentsDB"
  });  

connection2.connect(function(error) {
    if(!!error){
        console.log("Error!" + error);
    } 
    menu();
});  

function menu(){

    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
  
        choices: [
          "View Product Sales by Department",
          "Create New Department",
        ]
      })
      .then(function(answer) {
        switch (answer.action) {

        case "View Product Sales by Department":
            viewDept();
            break;

        case "Create New Department":
          createDept();
          break;
        }
      });
}


function createDept(){
    console.log("make department");

    inquirer
    .prompt([
        {name: "dept_id",
        type: "input",
        message: "enter a unique department number"
      },
      { name: "department_name",
        type: "input",
        message: "enter department name such as Womens, Mens, Kids, etc."
      },
      { name: "overheads",
        type: "input",
        message: "what is the estimate overheard cost of this department"
      }])
      .then(function(answer) {
        var department_id = answer.dept_id;
        var department_name = answer.department_name;
        var overheads = answer.overheads;
       
        var sql = "INSERT INTO departments (department_id, department_name, overheads) VALUES ('"+department_id+"','"+ department_name+"',"+ overheads+");";
        connection2.query(sql, function(error, res) {
            if (error) throw error;
            console.log("1 department created");


            connection2.query("SELECT * FROM departments;",function(error, res) {
            if (error) throw error;
            console.log(res);
            });




            menu();
            }); 
    });






// INSERT INTO departments (department_id, department_name,overheads)
// VALUES (101, "Mens", 888);
 // VALUES (501, "Womens", 900);
 // VALUES (901, "Kids", 200);
  // VALUES (351, "Electronics", 1000);
 // VALUES (101, "Cosmetics", 300);

   
}

function viewDept(){
    console.log("view department");
    menu();
}