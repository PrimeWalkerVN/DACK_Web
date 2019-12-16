let express = require('express');
let router = express.Router();
let taskCategory = require('../controllers/productTask');
let cartTask = require('../controllers/cartTask');
/* GET home page. */
router.get('/', taskCategory.loadHomePage);

//Add to shoping cart
router.get('/add-to-cart/:id',cartTask.homePageAddToCart);

module.exports = router;
 