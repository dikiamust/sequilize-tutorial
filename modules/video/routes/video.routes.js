const express = require('express');
const videoRouter = express.Router();
const db = require('../../../db/db')
const videoController = require('../controllers/video.controller');

videoRouter.post("/api/add-video", videoController.addVideo);

module.exports = videoRouter;