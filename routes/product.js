const express = require('express');

const productController = require('../controller/product')
const userauthentication = require('../middleware/auth')

const router = express.Router();

router.post('/addproduct', userauthentication.authenticate,  productController.addproduct)

router.get('/getproducts:page:selectedValue', userauthentication.authenticate ,  productController.getproducts )

router.delete('/deleteproduct/:productid', userauthentication.authenticate , productController.deleteproduct)

module.exports = router;