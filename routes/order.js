const express = require('express');

const orderController = require('../controller/order');
const userauthentication = require('../middleware/auth')

const router = express.Router();

router.get('/getorders',userauthentication.authenticate, orderController.getorders);

module.exports = router;