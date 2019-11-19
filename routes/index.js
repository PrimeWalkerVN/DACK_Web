var express = require('express');
var router = express.Router();
let Product = require('../models/product')

/* GET home page. */
router.get('/', function(req, res,next) {
  Product.find(function(err,docs){
    // let productChunks = [];
    // let chunkSize=10;
    // for(let i = 0; i < docs.length;i+=chunkSize)
    // {
    //   productChunks.push(docs.slice(i, i + chunkSize))
    // }
    // res.render('index',{products: productChunks});

    if(err)
    {
      console.log ("Render product error!");
    }else
      res.render('index',{products:docs})
  });
 
});

module.exports = router;
