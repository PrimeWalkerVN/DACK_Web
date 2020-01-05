let Product = require('../models/product');
let Cart = require('../models/cart');

exports.loadCart = function(req, res,next) {
    if (!req.session.cart){
      return res.render('cart',{products: null});
    }
    let cart = new Cart(req.session.cart);
    res.render('checkout',{products: cart.generateArray(),totalPrice: cart.totalPrice});
};

exports.createOrder = function(req,res,next){
    if(!req.session.cart){
        return res.render('cart',{products:null});
    }
    let cart = new Cart(req.session.cart);
    let body = req.body;
    console.log(body);
}