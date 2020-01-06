let mongoose = require('mongoose');
let Product = require('../models/product');
let Cart = require('../models/cart');
let Schema = mongoose.Schema;

const Item = new Schema({
    id: {type: mongoose.Types.ObjectId,ref:"products"},
    title: {type: String},
    typeProduct: {type: String},
    quantity: {type: String},
    price: {type: String}
});

let Order = new Schema({
    userId: {type: mongoose.Types.ObjectId,ref:"users", required:true},
    name: {type: String, required: true},
    telephone : {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    district: {type: String, required: true},
    province: {type: String, required: true},
    message: {type: String},
    createOn: {type: String},
    items: [Item],
    totalQuantity: {type: String},
    totalPrice: {type: String},
    status: {type:Number,default:0}
});


let orders = mongoose.model('Order',Order, 'orders');
let item = mongoose.model('Item',Item, 'items');

module.exports = {Order: orders, Item:item};