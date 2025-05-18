const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controllers');
const authMidlleware = require('../auth/authMidlleware');

router.post('/', authMidlleware,  contactController.create);
router.get('/', authMidlleware, contactController.getAll);
router.get('/:id', authMidlleware, contactController.getById);
router.patch('/:id', authMidlleware, contactController.updateById);
router.delete('/:id', authMidlleware, contactController.deleteById);

module.exports = router;