
var express = require('express');
var router = express.Router();
const guestController = require("../controllers/guest.controller");

/* Định nghĩa các route */
router.get('/', guestController.getAll);
router.get('/:id', guestController.getById);
router.post('/', guestController.insert);
router.put('/:id', guestController.update);
router.delete('/:id', guestController.delete);

module.exports = router;
