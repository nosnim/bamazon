var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'bamazon'
});

connection.connect();


function start() {

  connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;
    //console.log(`id: ${results[0].item_id} | name: ${results[0].product_name} | price: ${results[0].price}`);
    //"id: " + results[0].item_id + ""
    results.forEach(function (product) {
      console.log(`id: ${product.item_id} | name: ${product.product_name} | price: ${product.price}`);
    });
    inquirer.prompt([
      {
        type: "input",
        name: "chosenId",
        message: "What is the ID of the product you would like to buy?"
      },
      {
        type: "input",
        name: "chosenQty",
        message: "How many would you like?"
      }]).then(answers => {
        // Use user feedback for... whatever!!
        //console.log(answers);
        var id = parseInt(answers.chosenId);
        var qty = parseInt(answers.chosenQty);
        
        //console.log(id, qty);
        var productsStock;

        for (let i = 0; i < results.length; i++) {
          if (id == results[i].item_id) {
            //console.log(results[i], "This should be the right product");
            productsStock = results[i].stock_qty;
          }
        }
        //console.log(productsStock);

        if (qty < 1) {
          console.log("Please enter a valid quantity");
          connection.end();
        }
        
        else if (qty > productsStock) {

          console.log("Sorry we only have " + productsStock + " of that item in stock, please try again later");
          connection.end();

        } else {
          var newQuantity = productsStock - qty;

          connection.query('UPDATE products SET stock_qty = ? where item_id = ?', [newQuantity, id], function (error, results, fields) {
            if (error) throw error;
            //console.log(results);
            console.log("Thank you for your order");

            inquirer.prompt([{
              type: "confirm",
              name: "question",
              message: "Would you like to order again?"
            }]).then((answer) => {
              //console.log(answer);
              if (answer.question) {
                start()
              }
              else {
                console.log("Thank you please come again");
                connection.end();
              }
            });
          });
        }
      });
  });
};
start();




