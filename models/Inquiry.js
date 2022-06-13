"use strict";
const sequelize = require("sequelize");
const db = require("../db/db");

const Inquiry = db.define("Inquiry", {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please input a name",
      },
    },
  },
  email: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please input a email",
      },
      isEmail: {
        args: true,
        msg: "Email format is invalid",
      },
    },
  },
  subject: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please input a subject",
      },
    },
  },
  message: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please input a message",
      },
    },
  },
  createdAt: {
    type: sequelize.DATE,
  },
  updatedAt: {
    type: sequelize.DATE,
  },
});

module.exports = Inquiry;
