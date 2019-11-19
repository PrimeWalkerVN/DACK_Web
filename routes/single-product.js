var express = require('express');
var router = express.Router();
const mobgodb = require('mongodb');
let mongoose = require('mongoose');
//let DB = "mongodb://localhost:27017/shopping"
let Product = require('../models/product')

/* GET home page. */
router.get('/', function(req, res,next) {
  res.render('single-product');
});

router.get('/:id', function(req, res) {
  Product.findOne({"_id": mobgodb.ObjectID(req.params.id)}, function(err,doc){   
      if(err){
        console.log(err);
      }else{
       // res.send(docs);
        res.render('single-product', {product: doc});
      }
  });
    
});

module.exports = router;
