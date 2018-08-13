require("dotenv").config();
const mysql = require("mysql");
console.log(process.env.TWITTER_CONSUMER_KEY);

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

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

});

const allProducts = function (){
    connection.query('SELECT * from products', function(err, rows, fields) {
        if(err) console.log(err);
        console.log('The solution is: ', rows);
        connection.end();
    });
};

allProducts();