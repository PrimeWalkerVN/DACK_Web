let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const CartUserSchema = new Schema({
    _id : {type: mongoose.Types.ObjectId,ref:"users", required:true},
    cart: Schema.Types.Mixed
 });

let cartUsers = mongoose.model('CartUser',CartUserSchema, 'cartUsers');

module.exports = cartUsers;