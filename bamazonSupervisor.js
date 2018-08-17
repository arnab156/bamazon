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
      }).then(function(answer) {
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
        message: "what is the estimate overherd cost of this department"
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
}

function viewDept(){
    console.log("view department");
    
    connection.query("SELECT department_name,product_sales FROM products", function(error, res) {
        if (error) throw error;
        
        var deptObj = {};
        var mensArray=[];
        var totalMens = 0;
        var womensArray=[];
        var totalWomens = 0;
        var kidsArray=[];
        var totalKids = 0;
        

        for (z=0; z<res.length;z++){
           if(res[z].department_name === "Mens"){
            mensArray.push(res[z].product_sales);
           } 

           if(res[z].department_name === "Womens"){
            womensArray.push(res[z].product_sales);
           } 

           if(res[z].department_name === "Kids"){
            kidsArray.push(res[z].product_sales);
           } 
        }
        // console.log ("mens array " + mensArray);

        for (i=0; i<mensArray.length;i++){
            totalMens += mensArray[i];
        }
        
        for (i=0; i<womensArray.length;i++){
            totalWomens += womensArray[i];
        }
        
        for (i=0; i<kidsArray.length;i++){
            totalKids += kidsArray[i];
        }

        var grandTotal = totalMens+totalWomens+totalKids;

        console.log ("total mens sale " + totalMens);
        console.log ("total womens sale " + totalWomens);
        console.log ("total kids sale " + totalKids);
        console.log ("grand total ="+ grandTotal);

        var mensOverhead=0;
        var womensOverhead=0;
        var kidsOverhead=0;

        connection2.query("SELECT overheads FROM departments WHERE department_name = 'Mens'", function(error, res) {
            var resString = JSON.stringify(res);
            var resArray = JSON.parse(resString);
            mensOverhead += resArray[0].overheads;
            // console.log("Men's overhead " + mensOverhead);
            var mensProfit = totalMens-mensOverhead;

            var argument = "UPDATE departments SET total_profit="+ mensProfit +" WHERE department_name='Mens';";
            connection2.query(argument, function (err, result) {
                if (err) throw err;
                // console.log(result.affectedRows + " mens_total_profit record(s) updated");
            });
        });
        
        connection2.query("SELECT overheads FROM departments WHERE department_name = 'Womens'", function(error, res) {
            var resString = JSON.stringify(res);
            var resArray = JSON.parse(resString);
            womensOverhead += resArray[0].overheads; 
            // console.log("Women's overhead " + womensOverhead);
            var womensProfit = totalWomens-womensOverhead;

            var argument = "UPDATE departments SET total_profit="+ womensProfit +" WHERE department_name='Womens';";
            connection2.query(argument, function (err, result) {
                if (err) throw err;
                // console.log(result.affectedRows + " womens_total_profit record(s) updated");
            });
        });

        connection2.query("SELECT overheads FROM departments WHERE department_name = 'Kids'", function(error, res) {
            var resString = JSON.stringify(res);
            var resArray = JSON.parse(resString);
            kidsOverhead += resArray[0].overheads; 
            // console.log("Kid's overhead " + kidsOverhead);
            var kidsProfit = totalKids-kidsOverhead;

            var argument = "UPDATE departments SET total_profit="+ kidsProfit +" WHERE department_name='Kids';";
            connection2.query(argument, function (err, result) {
                if (err) throw err;
                // console.log(result.affectedRows + " kids_total_profit record(s) updated");
            });
        });


       connection2.query ("SELECT * FROM departments;", function(err, result){
                if (err) throw err;
                // console.log(result);
        console.log ("--------------------------------------------------------------------------------------------------------");
        console.log ("--------------------------------------------------------------------------------------------------------");
        console.log("| department_id | department_name | over_head_costs | product_sales | total_profit |") ;  

        console.log("|   " + result[0].department_id + "         | " + result[0].department_name+ "            | $" +result[0].overheads+"            | $"+totalMens+"       | $"+result[0].total_profit+"       |") ;   
        console.log("|   " + result[1].department_id + "         | " + result[1].department_name+ "          | $" +result[1].overheads+"            | $"+totalWomens+"       | $"+result[1].total_profit+"     |") ;   
        console.log("|   " + result[2].department_id + "         | " + result[2].department_name+ "            | $" +result[2].overheads+"            | $"+totalKids+"       | $"+result[2].total_profit+"      |") ;   
        console.log ("--------------------------------------------------------------------------------------------------------");
        console.log ("--------------------------------------------------------------------------------------------------------");
        menu();

       });
       
    //  
    });
}


