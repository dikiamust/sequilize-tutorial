const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const User = require('../../../models/User');
const db = require('../../../db/db');


exports.userRegister = async (req, res) => {
  const { userName, email } = req.body
  const password = bcrypt.hashSync(req.body.password, 8)

  try {
    if (!userName || !email || !password){
      return res.status(400).send({
        message: 'Missing required field(s)!'
      });
    }

    const emailExist = await User.findOne({ where : { email }});
    
    if (emailExist) {
      return res.status(400).send({
        message: 'Email already exist!'
      });
    }

    const addUser = await User.create({
      userName: userName,
      email: email,
      password: password
    })

    return res.status(200).json({
      message: "Created!",
      data: addUser
    }); 

  } catch (err) {
    res.status(500).send({
      err : 'Internal server error!'
    });
  }
}

exports.userLogin = async (req, res) => {
  const { password, email } = req.body;

  try {
    if (!email || !password){
      return res.status(400).send({
        message: 'Missing required field(s)!'
      });
    }

    const loginEmail = await User.findOne({ email });
    if (!loginEmail) {
      return res.status(400).send({
        message: 'Invalid email or password!'
      });
    }

    const loginPassword = bcrypt.compareSync(
      password,
      loginEmail.password
    );

    if (!loginPassword) {
      return res.status(400).send({
        message: 'Invalid email or password!'
      });
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
    res.status(500).send({
      err : 'Internal server error!'
    });
  }
}

