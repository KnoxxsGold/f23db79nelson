var express = require('express');
const pasta_controlers = require('../controllers/pasta');
var router = express.Router();

/* GET pasta detail */
router.get('/', pasta_controlers.pasta_list);
router.get('/:id', pasta_controlers.pasta_detail);
router.put('/:id', pasta_controlers.pasta_update_put);
router.delete('/:id', pasta_controlers.pasta_delete);

/* GET detail pasta page */
router.get('/detail', pasta_controlers.pasta_view_one_Page);

/* GET create pasta page */
router.get('/create', pasta_controlers.pasta_create_Page);


module.exports = router;

