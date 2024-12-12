const express = require('express');
const productoController = require('../controllers/productController.js');
const router = express.Router();

//route to get products by category
router.get('/categoria/:categoria', productoController.getProductsByCategory);

module.exports = router;