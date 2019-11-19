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
products.SP_aoLen = mongoose.model('SP_aoLen',schema, 'AoLen');
products.SP_aoThun = mongoose.model('SP_aoThun',schema, 'AoThun');
products.SP_aoLot = mongoose.model('SP_aoLot',schema, 'AoLot');
products.SP_aoSoMi = mongoose.model('SP_aoSoMi',schema, 'AoSoMi');
products.SP_sneaker = mongoose.model('SP_sneaker',schema, 'Sneaker');
products.SP_giayCaoCo = mongoose.model('SP_giayCaoCo',schema, 'GiayCaoCo');
products.SP_giayCaoGot = mongoose.model('SP_giayCaoGot',schema, 'GiayCaoGot');

//  module.exports = mongoose.model('SP_aoLen',schema, 'aoLen');
//  module.exports = mongoose.model('SP_aoThun',schema, 'aoThun');
//  module.exports = mongoose.model('SP_aoLot',schema, 'aoLot');
//  module.exports = mongoose.model('SP_aoSoMi',schema, 'aoSoMi');
//  module.exports = mongoose.model('SP_sneaker',schema, 'sneaker');
//  module.exports = mongoose.model('SP_giayCaoCo',schema, 'giayCaoCo');
//  module.exports = mongoose.model('SP_giayCaoGot',schema, 'giayCaoGot');