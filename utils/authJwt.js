const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv').config();

class AuthJwt {
  static authentication(req, res, next) {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { neme : 'MISSING_TOKEN'}
    }

    const key = process.env.SECRETKEY;

    try {
      const payload = jwt.verify(access_token, key)
      // attach the user to the job routes
      req.user = { userId: payload.id }
      next()
    } catch (error) {
      throw { name : 'INVALID_TOKEN'}
    }
  }

  static async authorization(req, res, next) {
    const id = req.params.userid;
    const UserId = req.UserId;
    const searchUser = await User.findById(UserId);

    try {
      if (searchUser.id === id) {
        next();
      } else {
        throw { name : 'FORBIDDEN'}
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = AuthJwt;
