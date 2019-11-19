let mongoose = require('mongoose');
let Schema = mongoose.Schema
let schema = new Schema({
    id: {type: Number, required: true},
    title: {type: String, required: true},
    price: {type: Number, required: true},
    typeProduct: {type: String, required: true},
    brand: {type: String, required: true},
    color: {type: String, required: true},
    imagePath: {type: String, required: true},
});

let products = mongoose.model('Product',schema, 'products');
module.exports = products;
products.SP_aokhoac = mongoose.model('SP_aokhoac', schema, "AoKhoac");
products.SP_quantay= mongoose.model('SP_quantay', schema, "QuanTay");
products.SP_quanthethao = mongoose.model('SP_quanthethao', schema, "QuanTheThao");
products.SP_quanjogger = mongoose.model('SP_quanjogger', schema, "QuanJogger");
products.SP_vay = mongoose.model('SP_vayc', schema, "Vay");
products.SP_dam = mongoose.model('SP_dam', schema, "Dam");