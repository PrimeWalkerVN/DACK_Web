let mongoose = require('mongoose');
let Schema = mongoose.Schema
let schema = new Schema({
    id: {type: Number, required: true},
    imagePath: {type: String, required: true},
    title: {type: String, required: true},
    price: {type: Number, required: true},
});

 module.exports = mongoose.model('Product',schema, 'products');
