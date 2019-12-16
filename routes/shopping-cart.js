let express = require('express');
let router = express.Router();
let cartTask = require('../controllers/cartTask');
/* GET home page. */
router.get('/', cartTask.loadCart);
module.exports = router;