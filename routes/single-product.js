let express = require('express');
let router = express.Router();
let taskCategory = require('../controllers/productTask');
let cartTask = require('../controllers/cartTask');
/* GET home page. */

router.get('/:id', taskCategory.loadSingleProduct);
router.get('/add-to-cart/:id',cartTask.singleProductAddtoCart);
module.exports = router;