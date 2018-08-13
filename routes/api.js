require("dotenv").config();
const mysql = require("mysql");
var express = require('express');
var router = express.Router();


var connection = mysql.createConnection({
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

const allProducts = function (res){
    connection.query('SELECT * from products', function(err, rows, fields) {
        if(err) console.log(err);
        console.log('The solution is: ', rows);
        connection.end();
        return res.json(rows);
    });
};

router.get('/', function(req, res, next) {
    var product_id = req.param('product_id');
    var qty = req.param('qty');
    console.log(product_id + " " + qty);
    allProducts(res);
    // allProducts(res);
});

module.exports = router;