var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Letmein@156",
    database: "bamazonDB"
  });

connection.connect(function(err) {
    if (err) throw err;
    menuOptions();
}); 

function menuOptions() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
  
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "Delete a Product"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
          pdtSearch();
          break;
  
        case "View Low Inventory":
         lowInventory();
          break;
  
        case "Add to Inventory":
          addInventory();
          break;

        case "Delete a Product":
        deletePdt();
        break;

        case "Add New Product":
          addPdt();
          break;
        }
      });
  }

  function pdtSearch(){
        connection.query("SELECT * FROM products", function(error, res) {
            if(!!error){
                console.log("Error!");
            } else {
                console.log("Items available for sale:");
                // console.log(res);
                console.log ("----------------------------------ITEMS AVAILABLE----------------------------------");
                console.log ("--------------------------------------FOR SALE-------------------------------------");
                for (var i = 0; i < res.length; i++) {
                    console.log(res[i].id+ " - "+res[i].product_name+", "+res[i].department_name + ", $" + res[i].price+ ", Available Quantity - "+ res[i].stock_quantity);
             }
                console.log ("----------------------------------THANK YOU!---------------------------------------");
                console.log ("-----------------------------------------------------------------------------------");
            }
            menuOptions();
        }); 
      }

function lowInventory(){
    connection.query("SELECT * FROM products WHERE stock_quantity <4", function(error, res) {
        if(!!error){
            console.log("Error!" + error);
        } else {
            console.log("Items with low Inventory:");
            // console.log(res);
            console.log ("--------------------------------------LOW INVENTORY--------------------------------------");
            console.log ("--------------------------------------LOW INVENTORY--------------------------------------");
            for (var i = 0; i < res.length; i++) {
                
                console.log(res[i].id+ " - "+res[i].product_name+", "+res[i].department_name + ", $" + res[i].price+ ", Available Quantity - "+ res[i].stock_quantity);
         }
         console.log ("--------------------------------------------------------------------------------------------");
         console.log ("--------------------------------------------------------------------------------------------");
        }
        menuOptions();
    });   
}      

function addInventory(){
    inquirer
    .prompt([
        {
        name: "productId",
        type: "input",
        message: "Select a product ID to update inventory"
      },
      { name: "quant",
        type: "input",
        message: "How many products would to like to add?"
      }
    ]).then(function(answer) {
        // console.log(answer);

        var selectedPdt=answer.productId;
        var updateQty = answer.quant;
        var resp = 0;
        var totalQty=0;
        connection.query("SELECT stock_quantity FROM products WHERE id='"+selectedPdt+"'", function(error, res) {
            if(!!error){
                console.log("Error!" + error);
            } else {
            
            var resString = JSON.stringify(res)
            var resParse = JSON.parse(resString);
            }
            resp = resParse[0].stock_quantity;
            resp = parseInt(resp);
            console.log("in stock already "+resp);
            totalQty = resp+parseInt(updateQty);
            console.log("this is the updated qty "+totalQty);
            connection.query("SELECT stock_quantity FROM products WHERE id='"+selectedPdt+"'", function(error, res) {
                if(!!error){
                    console.log("Error!" + error);
                } else {
                var sql = "UPDATE products SET stock_quantity ="+ totalQty +" WHERE id='"+selectedPdt+"';";
                connection.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log(result.affectedRows + " record(s) updated");
                });
            }
            menuOptions();
          }); 
        }); 
    });   
}      

function addPdt(){
    console.log("Product is being added");
    inquirer
    .prompt([
        {name: "product_name",
        type: "input",
        message: "enter product name such as jacket, skirt, etc."
      },
      { name: "department_name",
        type: "input",
        message: "enter department name such as womens, mens, kids, etc."
      },
      { name: "price",
        type: "input",
        message: "what is the retail price?"
      },
      { name: "quant",
        type: "input",
        message: "How many products would to like to add?"
      }
    ]).then(function(answer) {
        var product_name = answer.product_name;
        var department_name = answer.department_name;
        var price = answer.price;
        var quant = answer.quant;
        var sql = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('"+product_name+"','"+ department_name+"',"+ price+","+quant+");";
        connection.query(sql, function(error, res) {
            if (error) throw error;
            console.log("1 record inserted");
            menuOptions();
            }); 
    });
}

function deletePdt(){
    inquirer
    .prompt([
        {
        name: "productId",
        type: "input",
        message: "What PRODUCT ID would your want to PERMANENTLY DELETE from Inventory?"
      },
      {
        type: "confirm",
        message: "Are you sure? DELETION CANNOT BE REVERSED!",
        name: "confirm",
        default: true
      }
    ]).then(function(answer) {
        if(answer.confirm){
            var sql = "DELETE FROM products WHERE id = "+answer.productId;
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Number of records deleted: " + result.affectedRows);
                });
        }
        menuOptions(); 
    });

  
}
