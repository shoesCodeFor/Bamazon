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

// Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});
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
            console.log(result);
            console.log(answers);
            console.log("Let us check if we have this in stock....");
            updateProductQty(result, quantity);
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
const getProduct = (prodID, cb = undefined) => {
    let qty;
    connection.query(`SELECT * from products where product_id = '${prodID}'`, function(err, rows, fields) {
        if(err) console.log(err);
        console.log('All products: ', rows);

        qty = rows[0].stock_quantity-1;
        console.log('Inventory Updated: ' + qty);
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
        console.log('Single Product: ', rows);
        // connection.end();
    });
    getProduct(prodID);
    // allProducts();
};



allProducts();
//
// // updateProductQty(7, 500);
//
// getProduct(7, updateProductQty);
// allProducts();