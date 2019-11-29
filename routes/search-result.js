let express = require('express');
let router = express.Router();
let taskCategory = require('../controllers/task');
router.get('/:title', taskCategory.loadSearchResult);


module.exports = router;
 