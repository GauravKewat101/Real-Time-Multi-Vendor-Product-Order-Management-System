const router = require('express').Router();
const {auth} = require('../middelware/auth');

const orderController = require('../controller/orderController');

router.post('/create-order',auth,orderController.createOrder);

module.exports = router;