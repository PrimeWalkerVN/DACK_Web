let express = require('express');
let router = express.Router();

let productTask = require('../controllers/productTask')
let userTask = require('../controllers/userTask')
let cartTask = require('../controllers/cartTask');


/* GET home page. */
router.get('/:id', productTask.loadSingleProduct);

//add to cart
router.get('/add-to-cart/:id',cartTask.singleProductAddtoCart);

//comment
router.post("/:id/comment", productTask.isLoggedIn, productTask.commentProduct);

module.exports = router;