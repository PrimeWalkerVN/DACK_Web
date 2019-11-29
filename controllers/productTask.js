let Product = require('../models/product');
const mobgodb = require('mongodb');

exports.loadSingleProduct = function(req,res,next){
  Product.findOne({"_id": mobgodb.ObjectID(req.params.id)}, function(err,doc){   
          if(err){
            console.log(err);
          }else{
            res.render('single-product', {product: doc});
          }
  });
}

exports.loadHomePage= function (req,res,next){
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
     res.render('index',{products:tenProduct, user: req.user})
    }
  });
}

exports.loadCategoryPage = function (req,res,next){
     res.render('category');
}

