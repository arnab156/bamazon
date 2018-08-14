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
      console.log("Error!");
  } else {
   console.log("Items available for sale:");
    connection.query("SELECT * FROM products", function(error, res) {
        //    console.log(res);
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id+ " - "+res[i].product_name+", "+res[i].department_name + ", $" + res[i].price+ ", "+ res[i].stock_quantity);
            // if (res[i].stock_quantity<2){
            //     restock();
            // }
        }
    });
    selectId();
  }
});  

function selectId() {
    inquirer
    .prompt({
        name: "productId",
        type: "input",
        message: "Select a product ID to purchase"
      })
      .then(function(answer) {
        console.log(answer.productId);
        var selectedPdt=answer.productId;
        quantity(selectedPdt);
      });

}

function quantity(selectedPdt){
    inquirer
    .prompt({
        name: "quantity",
        type: "input",
        message: "How many products do you want to purchase?"
      })
      .then(function(answer) {
        // console.log(answer);
        // console.log("passed product ID information: "+selectedPdt);
        
        connection.query("SELECT * FROM products WHERE id='"+selectedPdt+"'", function(error, res) {
            if(!!error){
                console.log("Error is in this query!");
                console.log(error);
            } else {
             console.log("Here are your product information!");
            }
            console.log(res);
            // console.log(res[0].stock_quantity);
            // console.log(answer.quantity);
            var difference = res[0].stock_quantity-answer.quantity;
            // console.log(difference);
            if (difference<0) {
             console.log("Insufficient stock quantity to fulfill your order!");
             restock();
            } else {
                var total = answer.quantity*res[0].price;
                var totalTax = (answer.quantity*res[0].price)*1.1025;
                console.log("Congrats on your new purchase! You bought "+res[0].product_name+" from the "+res[0].department_name+" department.");
                console.log("Amount to be paid is $"+ total +" without tax & $"+ totalTax +" inclusing Chicago Sales Tax!");
                //update the stock after sale
                
                updateQty(difference,selectedPdt);
                // connection.query("UPDATE products SET stock_quantity ="+ difference +"WHERE id='"+selectedPdt+"'", function(error, res) {
                //     if(!!error){
                //         console.log("Error is in this query!");
                //         console.log(error);
                //     } else {
                //      console.log(res.affectedRows + " record(s) updated because of purchase!");
                //     }
                // });
            }
             
        
            
        });

      });
}

function restock (){
    console.log("Stock Order for this item is being placed and replenished! Please hold.");
    connection.query("UPDATE products SET  stock_quantity = 10 WHERE id='"+selectedPdt+"'", function(error, res) {
        if(!!error){
            console.log("Error is in this query!");
            console.log(error);
        } else {
         console.log(res.affectedRows + " record(s) updated");
        }
    });
}

function updateQty(difference,selectedPdt){
        //Update the address field:
        var sql = "UPDATE products SET stock_quantity ="+ difference +" WHERE id='"+selectedPdt+"';";
        connection.query(sql, function (err, result) {
          if (err) throw err;
          console.log(result.affectedRows + " record(s) updated");
        });
   
}   