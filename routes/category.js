let express = require('express');
let router = express.Router();
let taskCategory = require('../controllers/productTask');
let cartTask = require('../controllers/cartTask');

/* GET home page. */
router.get('/',taskCategory.loadCategoryPage);

//add product to cart
router.get('/add-to-cart/:id',cartTask.categoryPageAddToCart)
module.exports = router;