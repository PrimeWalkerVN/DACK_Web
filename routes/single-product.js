let express = require('express');
let router = express.Router();

let taskCategory = require('../controllers/productTask')
let userTask = require('../controllers/userTask')
let cartTask = require('../controllers/cartTask');

let {comment} = require('../models/productComment');
let {productComment} = require('../models/productComment');
/* GET home page. */
router.get('/:id', taskCategory.loadSingleProduct);

//add to cart
router.get('/add-to-cart/:id',cartTask.singleProductAddtoCart);

//comment
router.post("/:id/comment", userTask.isLoggedIn, (req, res) =>{

    let timenow = new Date().toLocaleString();
    console.log(timenow);
    const newComment = new comment({
        userName: req.user.username,
        name: req.user.name,
        time: timenow,
        content: req.body.content
    });
    
    productComment.findOneAndUpdate({ productId: req.params.id }, {$push: {comments: newComment}}, {upsert:true}, function(err){
        if(err){
            console.log(err);

        }else{
            console.log("done");
            res.redirect('/single-product/'+req.params.id);
        }
    });
});

module.exports = router;