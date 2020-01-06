let express = require('express');
let router = express.Router();
let trackingTask = require('../controllers/trackingTask');

/* GET tracking page. */
router.get('/',trackingTask.isLoggedIn,trackingTask.loadOrdersOfUsers);

/* GET detail order */
router.get('/detail-order/:id',trackingTask.loadDetailOrder);

module.exports = router;