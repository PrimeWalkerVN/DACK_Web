let Cart = require('../models/cart');
let {Order} = require('../models/order');
let {Item} = require('../models/order');
let validator = require('validator');

exports.loadCart = function(req, res,next) {
    if (!req.session.cart){
      return res.render('cart',{products: null});
    }
    let cart = new Cart(req.session.cart);
    res.render('checkout',{products: cart.generateArray(),totalPrice: cart.totalPrice});
};

exports.createOrder = async function(req,res,next){
    let cartOld = new Cart(req.session.cart ? req.session.cart: {});
    const {name,telephone,email,address,province,district,messages} = req.body;
    let errors = [];    

    if(!name||!telephone||!email||!address||!province||!district){
        errors.push({msg: 'Vui lòng nhập đầy đủ thông tin!'});
    }else if(!validator.isEmail(email)){
        errors.push({msg: 'Sai email, vui lòng nhập lại!'});
    }

    if(errors.length > 0){
        req.flash('error_msg',errors);
        let messages =  req.flash('error_msg');
        res.render('checkout',{
            products:cartOld.generateArray(),totalPrice:cartOld.totalPrice,
            messages: messages,
            hasErrors: messages.length > 0
        });
    } 
    else {
        if(!req.session.cart){
            return res.render('cart',{products:null});
        }
        let items = [];
        for(let id in cartOld.items){
            let item = new Item({
                _id: id,
                title : cartOld.items[id].item.title,
                price : cartOld.items[id].price,
                typeProduct : cartOld.items[id].item.typeProduct,
                quantity : cartOld.items[id].quantity
            });
            items.push(item);
        }
    
        let newOrder = new Order({
            userId: req.user._id,
            name: req.body.name,
            telephone: req.body.telephone,
            email: req.body.email,
            address: req.body.address,
            province: req.body.province,
            district: req.body.district,
            messages: req.body.messages,
            items: items,
            createOn: new Date().toLocaleString(),
            totalPrice: cartOld.totalPrice,
            totalQuantity: cartOld.totalQuantity,
            status:1
        })
         await newOrder.save(function(err,result) {
             if(err) return res.status(500).json({message:err.message})
             else {
                req.session.cart = {};
                res.render('confirmation',{order:newOrder,hasSuccess:true,title:'Xác nhận đơn hàng'});
             }
        });
    }
}

exports.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.redirectTo = req.originalUrl; 
    res.redirect('/users/login');
}