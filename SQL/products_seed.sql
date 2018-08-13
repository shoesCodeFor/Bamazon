CREATE DATABASE `bamazon`;

USE `bamazon`;

CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int(10) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) NOT NULL,
  `department_id` int(10) NOT NULL,
  `price` double(12,2) NOT NULL,
  `stock_quantity` int(10) NOT NULL,
  `img_src` VARCHAR( 100 ) NULL,
  PRIMARY KEY (`product_id`)
);

INSERT INTO `products` (`product_name`, `department_id`, `price`, `stock_quantity`, `img_src`)
VALUES
('Nintendo Switch Game Console', '10', '299.99', '5000', 'https://upload.wikimedia.org/wikipedia/commons/8/88/Nintendo-Switch-wJoyCons-BlRd-Standing-FL.jpg'),
('Dog Pillow Deluxe', '90', '19.99', '6500', 'https://cdn.pixabay.com/photo/2016/12/30/20/27/bulldog-1941428_960_720.png'),
('Essential Oil Diffuser', '50', '39.99', '9999', 'https://c1.staticflickr.com/8/7241/27330946272_48a147f407_b.jpg'),
('Electric Yard Trimmer', '80', '89.99', '3500', 'https://upload.wikimedia.org/wikipedia/commons/f/f8/15.Electric_Brushcutter.jpg'),
('Kitchen Rolling Pin', '60', '19.99', '6100', 'https://upload.wikimedia.org/wikipedia/commons/4/40/Rollingpin.jpg'),
('Rework: Change the Way You Work Forever', '70', '19.99', '4000', 'https://c1.staticflickr.com/5/4069/4419345051_6402c35f9c_z.jpg?zz=1'),
('Heart and Soul Radio - "Lost On Me EP"', '100', '9.99', '500', 'N/A')
;
