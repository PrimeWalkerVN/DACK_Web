
let {Order} = require('../models/order');
let hbs = require('hbs');

hbs.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

exports.loadOrdersOfUsers = function(req, res,next) {
    let userId = req.user._id;
    let orders = [];
    Order.find({userId: userId}, function(err,data) {
        if(err) return res.status(500).json({message:err.message})
        else{
            orders = data;
            res.render('tracking',{orders:orders});
        }
    });
    
};

exports.loadDetailOrder = function(req, res, next) {
    let orderId = req.params.id;
    Order.findOne({_id:orderId},function(err,data){
        if(err) redirect('/tracking');
        res.render('confirmation',{order:data,hasSuccess:false,title:'Chi tiết đơn hàng'});
    });

}
exports.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.redirectTo = req.originalUrl; 
    res.redirect('/users/login');
}