const express = require("express");
const inquiryRouter = express.Router();
const inquiryController = require("../controllers/inquiry.controller");

inquiryRouter.get("/api/inquiry", inquiryController.list);
inquiryRouter.post("/api/public/inquiry", inquiryController.sendInquiry);

module.exports = inquiryRouter;
