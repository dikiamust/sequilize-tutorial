const express = require('express');
const videoRouter = express.Router();
const db = require('../../../db/db')
const videoController = require('../controllers/video.controller');

videoRouter.post("/api/video", videoController.addVideo);
videoRouter.get("/api/video", videoController.findAllVideo);

module.exports = videoRouter;