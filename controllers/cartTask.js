let Product = require('../models/product');
var Cart = require('../models/cart')


exports.loadCart = function(req, res,next) {
    if (!req.session.cart){
      return res.render('cart',{products: null});
    }
    let cart = new Cart(req.session.cart);
    res.render('cart',{products: cart.generateArray(),totalPrice: cart.totalPrice});
};

exports.homePageAddToCart = function(req,res,next){
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart: {});
    Product.findById(productId,function (err,product){
        if(err) {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/');
    });
};

exports.categoryPageAddToCart = function(req,res,next){
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart: {});
    Product.findById(productId,function (err,product){
        if(err) {
            return res.redirect('/category');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/category');
    });
};