const express = require('express');

const orderController = require('../controller/order');

const router = express.Router();

router.post('/addorder', orderController.addorder);

// router.post('/login', orderController.login)


module.exports = router;