const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const User = require('../../../models/User');
const db = require('../../../db/db');


exports.userRegister = async (req, res, next) => {
  const { userName, email } = req.body
  const password = bcrypt.hashSync(req.body.password, 8)

  try {
    if (!userName || !email || !password){
      throw { name : 'NOT_NULLABBLE'}
    }

    const emailExist = await User.findOne({ where : { email }});
    
    if (emailExist) {
      throw { name : 'EMAIL_EXIST' }
    }

    const addUser = await User.create({ userName, email, password })

    res.status(200).json({
      message: 'Created!',
      data: {id : addUser.id , email : addUser.email }
    }); 

  } catch (err) {
    next(err)
  }
}

exports.userLogin = async (req, res, next) => {
  const { password, email } = req.body;

  try {
    if (!email || !password){
      throw { name : 'NOT_NULLABBLE'}
    }

    const loginEmail = await User.findOne({ where : { email }});
    if (!loginEmail) {
      throw { name :  'FALSE_LOGIN' }
    }

    const loginPassword = bcrypt.compareSync(
      password,
      loginEmail.password
    );

    if (!loginPassword) {
      throw { name :  'FALSE_LOGIN' }
    }
    
    const key = process.env.SECRETKEY;
    let token = jwt.sign({id: loginEmail.id}, key, {
      expiresIn: '1h',
    });

    res.status(200).json({
      message: 'Login successfull!',
      data: loginEmail,
      access_token: token
    }); 
  } catch (err) {
    next(err)
  }
}

