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
    let twelveProduct = [];
    for(let i =0 ; i < 12; ++i ){
      twelveProduct.push(docs[i]);
    }
     res.render('category',{products:twelveProduct})
    }
  });
});

module.exports = router;