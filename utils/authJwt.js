const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv').config();

class AuthJwt {
  static authentication(req, res, next) {
    const { access_token } = req.headers;
    if (!access_token) {
      return res.status(401).json({
        success: false,
        message: "Missing access_token",
      });
    }
    const key = process.env.SECRETKEY;
    jwt.verify(access_token, key, (err, decoded) => {
      if (err) {
        res
          .status(401)
          .json({message: "Invalid access_token", success: false, data: err});
      }
      req.UserId = decoded.id;
      next();
    });
  }

  static async authorization(req, res, next) {
    const id = req.params.userid;
    const UserId = req.UserId;
    const searchUser = await User.findById(UserId);

    try {
      if (searchUser.id.toString() !== id) {
        res.status(401).json({
          success: false,
          message: "Forbidden access",
        });
      } else {
        next();
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  }
}

module.exports = AuthJwt;
