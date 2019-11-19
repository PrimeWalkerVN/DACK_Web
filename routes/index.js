var express = require('express');
var router = express.Router();
let Product = require('../models/product')

/* GET home page. */
router.get('/', function(req, res,next) {
  Product.find(function(err,docs){
    if(err)
    {
      console.log ("Render product error!");
    }else
    {
    let tenProduct = [];
    for(let i =0 ; i < 10; ++i ){
      tenProduct.push(docs[i]);
    }
     res.render('index',{products:tenProduct})
    }
  });
 
});

module.exports = router;
