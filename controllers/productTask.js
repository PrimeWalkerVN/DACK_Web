let Product = require('../models/product');
const mobgodb = require('mongodb');
const request = require('request');
let { productComment } = require('../models/productComment');
let { comment } = require('../models/productComment');


exports.loadSingleProduct = function (req, res, next) {
  req.session.redirectTo = req.originalUrl; 
  request('https://still-plateau-02404.herokuapp.com/relatedProducts', { json: true }, async (err, rspd, body) => {
    if (err) { return console.log(err); }
    console.log(body);

    await
    Product.findOne({ "_id": mobgodb.ObjectID(req.params.id) }, async function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        let commentList = [];
        console.log(req.params.id);
        await productComment.findOne({ productId: req.params.id }, function (err, data) {
          //console.log(docs);
          if (err) {
            commentList = [];
          }
          else if (data != null) {
            commentList = data.comments;
          } else {
            commentList = [];
          }
          res.render('single-product', { product: doc, comments: commentList, relatedProducts: body.result });
        })

        //await console.log(commentList);


        //await res.render('single-product', { product: doc, comments: commentList, relatedProducts: body.result });
      }
    });
  });
}

exports.commentProduct = (req, res) =>{
  let timenow = new Date().toLocaleString();
  console.log(timenow);
  const newComment = new comment({
      userName: req.user.username,
      name: req.user.name,
      time: timenow,
      content: req.body.content
  });
  
  productComment.findOneAndUpdate({ productId: req.params.id }, {$push: {comments: newComment}}, {upsert:true}, function(err){
      if(err){
          console.log(err);

      }else{
          console.log("done");
          res.redirect('/single-product/'+req.params.id);
      }
  });
};

exports.loadHomePage = async function (req, res, next) {
  Product.find(function (err, docs) {
    if (err) {
      console.log("Render product error!");
    } else {
      let tenProduct = [];
      for (let i = 0; i < 10; ++i) {
        tenProduct.push(docs[i]);
      }
      res.render('index', { products: tenProduct, user: req.user })
    }
  });
}

exports.loadCategoryPage = function (req, res, next) {
  Product.find(function (err, docs) {
    if (err) {
      console.log("Render product error!");
    } else {
      let twelveProduct = [];
      for (let i = 0; i < 12; ++i) {
        twelveProduct.push(docs[i]);
      }
      res.render('category', { products: twelveProduct })
    }
  });
}

exports.loadSearchResult = function (req, res, next) {
  let a = req.params.title;
  Product.find({ title: { $regex: a, $options: "i" } }, (err, ret) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(ret.length);
      res.render('search-result', { aa: ret });
    }
  });
}

exports.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect('/users/login');
}