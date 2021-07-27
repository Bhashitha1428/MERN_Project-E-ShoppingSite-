const express = require('express');
const router = express.Router();
const { requireSignin } = require('../Common Middleware');
const { addItemToCart } = require('../controllers/cart');




router.post('/addItemToCart',requireSignin,addItemToCart)


module.exports=router;