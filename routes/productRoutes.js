const router = require('express').Router();
const {auth} = require('../middelware/auth');

const productController = require('../controller/productController.js');

router.post('/create-product',auth,productController.createProduct);
router.patch('/manage-product/:id',auth,productController.manageProduct);
router.patch('/delete-product/:id',auth,productController.deleteProduct);


module.exports = router;