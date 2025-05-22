const express = require("express");
const router = express.Router();
const adminContoller = require('../controllers/admin.controllers');
const authMiddleware = require('../auth/authMidlleware');
const adminMiddleware = require('../auth/adminMiddleware');

router.get('/contacts',authMiddleware, adminMiddleware,  adminContoller.getAllContacts);

module.exports = router;