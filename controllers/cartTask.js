let Product = require('../models/product');
let Cart = require('../models/cart');
let CartUser = require('../models/cartUser');

exports.loadUserCart = function(req, res,next){

    CartUser.findOne({_id:"5de392b192120400249a471d"},function(err,data){
        if(err) console.log(err.message);
        let items = data.cart.items;
       
        let newCart = new Cart(req.session.cart ? req.session.cart:{});
        console.log(newCart);
        for(let id in items){
            console.log(items[id]);
            newCart.addMultiple(items[id].item,id,items[id].quantity);
            
        }
        console.log(newCart);
    });
    let cart = new Cart(req.session.cart);
    res.render('cart',{products: cart.generateArray(),totalPrice: cart.totalPrice});
};

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

exports.singleProductAddtoCart = function (req, res,next){
    let productId = req.params.id;
    let qty = req.query.qty;
    let cart = new Cart(req.session.cart ? req.session.cart: {});
    Product.findById(productId,function (err,product){
        if(err) {
            return res.redirect('/single-product/' + productId);
        }
        for(let i= 0 ;i<qty;i++){
            cart.add(product, product.id);
        }
        req.session.cart = cart;
        res.redirect('/single-product/' + productId);
    });
}

exports.updateCart = function(req,res,next){
    let productId = req.params.id;
    let action = req.query.action;
    let cart = new Cart(req.session.cart ? req.session.cart: {});

    Product.findById(productId,function (err,product){
        if(err) {
            return res.redirect('/cart');
        }
        switch(action)
        {
            case "add":
                cart.add(product,product.id);
                break;
            case "remove":
                cart.removeItem(product.id);
                break;
            case "clear":
                cart.clearItem(product.id);
                break;
        }
        req.session.cart = cart;
        res.redirect('/cart');
    });
}