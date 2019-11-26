let express = require('express');
let router = express.Router();
let taskCategory = require('../controllers/task');

/* GET home page. */
router.get('/',taskCategory.loadCategoryPage);
module.exports = router;