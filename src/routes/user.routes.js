const express = require('express');
const UserController = require('../controllers/user.controller')
const { protect } = require('../middlewares/auth.middleware')

const router = express.Router();

router.get('/me', protect, UserController.getMe);

module.exports = router;