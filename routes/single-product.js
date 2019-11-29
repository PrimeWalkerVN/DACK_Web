let express = require('express');
let router = express.Router();
let taskCategory = require('../controllers/task')
/* GET home page. */

router.get('/:id', taskCategory.loadSingleProduct);
module.exports = router;