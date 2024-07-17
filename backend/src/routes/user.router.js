const express = require('express');
const { UserController } = require('../controllers/user.controller');
const accessMiddleware = require('../middlewares/access.middleware');
const { authenticate } = require("../middlewares/auth.middleware");
const router = express.Router();

//post request
router.post('/register', UserController.register);
router.post('/login', UserController.login);

//get request

//put request
router.put('/update/:id', [authenticate, accessMiddleware('admin', 'professor')], UserController.updateUser);

module.exports.UserRouter = router;