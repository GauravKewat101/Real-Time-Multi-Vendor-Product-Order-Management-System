const router = require('express').Router();
const {auth} = require('../middelware/auth.js');

const customerController = require('../controller/customerController.js');

// router.post('/place-order',auth,customerController.placeOrder);

module.exports = router;