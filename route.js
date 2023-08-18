const express = require('express');

const Controller = require('./controller.js');

const router = express.Router();



// /admin/add-product => GET
router.get('/', Controller.getItem);

// /admin/add-product => POST
router.post('/', Controller.postItem);

router.post('/del', Controller.delItem);


module.exports = router;
