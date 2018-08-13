require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");
var productList;
var productNames = [];


console.log("CLI Loaded")
console.log(process.env.MYSQL_HOSTNAME);
console.log(process.env.MYSQL_USERNAME);
console.log(process.env.MYSQL_PASSWORD);
console.log(process.env.MYSQL_PORT);
console.log(process.env.MYSQL_DB);

const config = {
    host: process.env.MYSQL_HOSTNAME,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DB
};
const local = {
    
        host: "localhost",
    
        // Your port; if not 3306
        port: 3306,
    
        // Your username
        user: "root",
    
        // Your password
        password: "",
        database: "bamazon"
    
}

// Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

const connection = mysql.createConnection(config);
const startCLI = () => {
    inquirer
        .prompt([
            /* Bamazon Questions */
            // The first should ask them the ID of the product they would like to buy.
            {
                name: 'productName',
                type: 'list',
                choices: productNames,
                message: "What Product Would You like to Buy?"
            },
            {
                name: 'quantity',
                type: 'input',
                message: "How Many Would You like to Buy?"
            }
            // The second message should ask how many units of the product they would like to buy.
        ])
        .then(answers => {
            // Use user feedback for transaction!!
            let productName = answers.productName;
            let quantity = answers.quantity;
            const result = productList.find( product => product.product_name === productName );

            console.log(`Selected Prod:`);
            console.log(result.product_name);
            // console.log(answers);
            console.log("Let us check if we have this in stock....");
            if(result.stock_quantity > 0){
                updateProductQty(result, quantity);
            }
            else{
                console.log("Sorry out of Stock :(");
            }
            
        });
};



connection.connect(function(err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId + "\n");

    });



const allProducts = () => {

    connection.query('SELECT * from products', function(err, rows, fields) {
        if(err) console.log(err);
        // console.log('The solution is: ', rows);
        productList = rows;
        rows.forEach(row => {
            productNames.push(row.product_name);
        });
        startCLI();
    });
};
const getProduct = (prodID, purchQty, cb = undefined) => {
    
    connection.query(`SELECT * from products where product_id = '${prodID}'`, function(err, rows, fields) {
        if(err) console.log(err);
        console.log("The product you purchased: ");
        console.log(`${rows[0].product_name} Price: ${rows[0].price} Qty Purchased: ${purchQty}`);
        console.log(`Total Price: ${(rows[0].price * purchQty).toFixed(2)}`);
        let qty = rows[0].stock_quantity;
        console.log('Inventory Updated: ' + qty +' avaialable');
        if(cb){
            return cb(prodID, qty)
        }
        connection.end();

    });

};

const updateProductQty = (prod, qty) => {
    let prodID = prod.product_id;
    let newQty = prod.stock_quantity - qty;
    connection.query(`UPDATE \`products\` SET \`stock_quantity\` = '${newQty}' WHERE \`products\`.\`product_id\` = ${prodID};`, function(err, rows, fields) {
        if(err) console.log(err);
        // console.log('Single Product: ', rows);
        // connection.end();
    });
    getProduct(prodID, qty);
    // allProducts();
};



allProducts();
//
// // updateProductQty(7, 500);
//
// getProduct(7, updateProductQty);
// allProducts();