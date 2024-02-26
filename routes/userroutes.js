// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');
const authMiddleware = require('../middleware/authmiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/verify-token', authMiddleware.requireAuth, userController.verifyToken);

module.exports = router;
