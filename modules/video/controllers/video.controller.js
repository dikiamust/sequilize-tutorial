const dotenv = require('dotenv').config();
const db = require('../../../db/db');
const Video = require('../../../models/Video');


exports.addVideo = async (req, res, next) => {
  const { name, userId } = req.body
  try {
    if (!name || !userId ){
      throw { name : 'NOT_NULLABBLE'}
    }

    const addVideo = await Video.create(req.body)
    
    res.status(201).json({
      message: 'Created!',
      data: addVideo
    }); 
    
  } catch (err) {
    next(err)
  }
}

exports.findAllVideo = async (req, res, next) => {
  try {
    const getAllVideo = await Video.findAll()

    if (getAllVideo.length < 1 ){
      throw { name : 'NOT_FOUND'}
    }
    
    res.status(200).json({
      message: 'Successfully!',
      data: getAllVideo
    }); 
    
  } catch (err) {
    next(err)
  }
}




