const express = require('express');
const authController = require('../controllers/authController.js');
const router = express.Router();

// Authetication routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// verify existing data from registered users
router.post('/checkAccount', authController.checkAccount);

module.exports = router;
