const dotenv = require('dotenv').config();
const db = require('../../../db/db');
const Video = require('../../../models/Video');


exports.addVideo = async (req, res) => {
  const { name, userId } = req.body
  try {
    const addVideo = await Video.create(req.body)

    res.json(addVideo);
    
  } catch (err) {
    return res.status(400).send({
      message: err
    });
  }
}


