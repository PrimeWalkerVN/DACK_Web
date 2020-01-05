const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    name:{
        type: String, 
        required: true
    },
    time:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    }
})

const productComment = new mongoose.Schema({
    productId:{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Product',
        required: true
    },
    comments:[Comment]

});


const ProductComment = mongoose.model('productComment', productComment);
const comment = mongoose.model('comment', Comment);

module.exports = {productComment: ProductComment, comment: comment};