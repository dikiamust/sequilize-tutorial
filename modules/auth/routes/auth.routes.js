const express = require('express');
const authRouter = express.Router();
const db = require('../../../db/db')
const authController = require('../controllers/auth.controller');

authRouter.post("/api/sign-up", authController.userRegister);
authRouter.post("/api/sign-in", authController.userLogin)


module.exports = authRouter;