const express = require('express');
const router = express.Router();
const product_controller=require('./product_controller')

router.post('/addProduct', product_controller.addProduct)
router.get('/getProducts', product_controller.getProducts)
router.patch('/updateProduct', product_controller.updateProduct)
router.delete('/removeProduct', product_controller.removeProduct)
 

 

module.exports = router;