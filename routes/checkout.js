let express = require('express');
let router = express.Router();
let checkoutTask = require('../controllers/checkoutTask.js');

/* GET home page. */
router.get('/',checkoutTask.isLoggedIn,checkoutTask.loadCart);
router.post('/create-order',checkoutTask.createOrder);

module.exports = router;