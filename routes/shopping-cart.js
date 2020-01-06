let express = require('express');
let router = express.Router();
let cartTask = require('../controllers/cartTask');
/* GET home page. */
router.get('/', cartTask.loadCart);
router.get('/add-to-session-cart', cartTask.addToSessionCart);

router.get('/update/:id',cartTask.updateCart);
module.exports = router;