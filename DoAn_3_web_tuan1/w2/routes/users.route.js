
var express = require('express');
var router = express.Router();
const usersController = require("../controllers/users.controller");
const xacthuc = require("./auth.middleware"); // Import middleware

/* Định nghĩa các route */
router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.post("/login", usersController.getByUsernamePass);
router.post('/register', usersController.insert);
router.put('/:id',xacthuc, usersController.update);
router.delete('/:id', usersController.delete);

module.exports = router;
