// Create an instance of model Product
let Product = require('../models/product');
let mongoose = require('mongoose');
let baseUrl = "mongodb://localhost:27017/shopping"
let mongoDB = baseUrl;

mongoose.connect(mongoDB, { useNewUrlParser: true });

let products = [
    new Product ({
        id: 1,
        imagePath: '/img/product/feature-product/f-p-1.jpg',
        title: 'Áo Tshirt cổ tròn',
     price: 100000
    }),
   
];  

let done = 0;

for(let i = 0; i < products.length; i++){
    // Save the new model instance, passing a callback
    products[i].save(function (err,result) {
        done++;
        if(done===products.length)
          exit();
     });
}

function exit()
{
    mongoose.disconnect(); // saved!
}

