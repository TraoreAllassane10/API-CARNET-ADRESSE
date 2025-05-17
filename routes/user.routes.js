const express = require("express");
const router = express.Router();
const userContoller = require('../controllers/user.controllers');

router.post('/register', userContoller.register);

router.post('/login', userContoller.login);

module.exports = router;