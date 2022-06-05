const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const User = require('../../../models/User');
const db = require('../../../db/db');


exports.userRegister = async (req, res, next) => {
  const {userName, email } = req.body
  try {
    const addUser = await User.create(req.body)

    res.json(addUser);
    
  } catch (err) {
    return res.status(400).send({
      message: err
    });
  }
}

exports.userLogin = async (req, res) => {
  const { password, email } = req.body;

  try {
    const loginEmail = await User.findOne({ email });
    if (!loginEmail) {
      throw new Error ('Invalid email or password');
    }

    const loginPassword = bcrypt.compareSync(
      password,
      loginEmail.password
    );

    if (!loginPassword) {
      throw new Error ('Invalid email or password');
    }
    
    const key = process.env.SECRETKEY;
    let token = jwt.sign({id: loginEmail.id}, key, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "login successful!",
      data: loginEmail,
      access_token: token
    }); 
  } catch (err) {
    console.log(err)
    res.send(err);
  }
}

