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
    new Product ({
        id: 2,
        imagePath: '/img/product/feature-product/f-p-2.jpg',
        title: 'Áo Tshirt xanh',
        price: 200000
    }),
    new Product ({
        id: 3,
        imagePath: '/img/product/feature-product/f-p-3.jpg',
        title: 'Set đồ xinh',
        price: 100000
    }),
    new Product ({
        id: 4,
        imagePath: '/img/product/feature-product/f-p-4.jpg',
        title: 'Áo Tshirt trắng',
        price: 400000
    }),
    new Product ({
        id: 5,
        imagePath: '/img/product/feature-product/f-p-5.jpg',
        title: 'Áo Tshirt cổ xanh',
        price: 300000
    }),
    new Product ({
        id: 6,
        imagePath: '/img/product/feature-product/f-p-4.jpg',
        title: 'Áo Tshirt ngắn tay',
        price: 200000
    }),
    new Product ({
        id: 7,
        imagePath: '/img/product/feature-product/f-p-5.jpg',
        title: 'Áo thun overside',
        price: 100000
    }),
    new Product ({
        id: 8,
        imagePath: '/img/product/feature-product/f-p-3.jpg',
        title: 'Áo Sơ mi',
        price: 500000
    }),
    new Product ({
        id: 9,
        imagePath: '/img/product/feature-product/f-p-2.jpg',
        title: 'Áo Tshirt cổ tròn',
        price: 400000
    }),
    new Product ({
        id: 10,
        imagePath: '/img/product/feature-product/f-p-1.jpg',
        title: 'Áo Tshirt dài tay',
        price: 200000
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

