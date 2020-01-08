let Product = require('../models/product');
let Cart = require('../models/cart');
let CartUser = require('../models/cartUser');

function saveCartToDB(req,res){
    if(req.isAuthenticated()){
        let cartUser = new CartUser ({
            _id: req.user._id,
            cart: req.session.cart
        });
        CartUser.findOneAndDelete({_id:req.user._id},function(err){
            if(err) 
            {
                console.log('xoa that bai');
                return res.redirect('/');
            }else
            console.log(' xoa thanh cong');
        });
        cartUser.save(function (err){
            if(err) console.log('luu that bai');
            else console.log('luu thanh cong');
        });
    }
};

exports.addToSessionCart = async function(req, res,next){
    if(!req.user){ 
        res.redirect('/cart/add-to-session-cart'); 
    }
    else {
    let newCart = new Cart(req.session.cart ? req.session.cart:{});
    await CartUser.findOne({_id:req.user._id}, function(err,data){
        if(err) {res.redirect('/');}
        if(data == null || data ==[] || data == undefined || data=={} || data.cart == undefined || data.cart.items == undefined ) 
        {  
            saveCartToDB(req,res);
            res.redirect(req.session.redirectTo || '/');
            delete req.session.redirectTo;
        }
        else { 
            let items = data.cart.items;
            for(let id in items){
            newCart.addMultiple(items[id].item,id,items[id].quantity);
            }
            req.session.cart = newCart;
            saveCartToDB(req,res);
            res.redirect(req.session.redirectTo || '/');
            delete req.session.redirectTo;
            
        }
        });
    }
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

        saveCartToDB(req,res);
        res.redirect(req.session.redirectTo);
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
        saveCartToDB(req,res);
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
        saveCartToDB(req,res);
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
        saveCartToDB(req,res);
        res.redirect('/cart');
    });
}