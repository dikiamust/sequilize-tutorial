"use strict";

/**
 * Module dependencies
 */
const path = require("path");
const emailMailer = require(path.resolve("./utils/email"));
const fs = require("fs");
const db = require(path.resolve("./db/db"));
const Inquiry = require(path.resolve("./models/Inquiry"));
const dotenv = require('dotenv').config();
const { Op } = require("sequelize");

/**
 * Display a listing of the inquiry
 *
 * @param req.query keyword, sort, order, limit, offset
 * @return Json
 */
exports.list = async function (req, res, next) {
  try {
    const {
      keyword,
      sort = "createdAt",
      order = "DESC",
      limit = 5,
      offset = 0,
    } = req.query;

    let query = {
      where: {},
      order: [[sort, order]],
      limit,
      offset,
    };

    if (keyword) {
      query.where[Op.or] = [
        {
          name: { [Op.iLike]: `%${keyword}%` },
        },
        {
          subject: { [Op.iLike]: `%${keyword}%` },
        },
        {
          email: { [Op.iLike]: `%${keyword}%` },
        },
      ];
    }

    const inquiries = await Inquiry.findAndCountAll(query);
    return res.status(200).json({
      count: inquiries.count,
      data: inquiries.rows,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Display the specified inquiry.
 *
 * @param  req.params id
 * @return Json
 */
exports.read = async function (req, res) {
  const id = req.params.id;

  try {
    const inquiry = await Inquiry.findOne({ where: { id } });

    if (!inquiry) {
      return res.status(400).send({
        message: `Inquiry with id ${id} is not found`,
      });
    }

    return res.status(200).json({
      data: inquiry,
    });
  } catch (e) {
    return res.status(400).send({
      message: errorHandler.getErrorMessage(e),
    });
  }
};

/**
 * send email & submit inquiry.
 *
 * @param  req.body email, subject, message, name
 * @return Json
 */
exports.sendInquiry = async function (req, res, next) {
  try {
    const { email, subject, message, name } = req.body;

    const templates = "modules/inquiry/templates/test.html";
    const emailTo = process.env.EMAIL_TEST
    const mailOption = {
      to: emailTo,
      from: email,
      subject: subject,
    };

    const mailData = {
      name,
      message,
    };

    await emailMailer.sendEmail(templates, mailData, mailOption);

    const inquiry = await Inquiry.create({
      name,
      email,
      subject,
      message,
    });

    return res.status(200).send({
      message: "Thank you We will get back to you in 2-3 business days.",
      data: inquiry,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * get status form
 */
exports.getStatus = async function (req, res) {
  try {
    const setting = await Setting.findOne({
      where: { optionName: "isEnableEnquiries" },
    });

    const status = setting.optionValue === "true";

    return res.status(200).send({
      data: {
        status,
      },
    });
  } catch (e) {
    return res.status(400).send({
      message: errorHandler.getErrorMessage(e),
    });
  }
};
