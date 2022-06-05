const dotenv = require('dotenv').config();
const db = require('../../../db/db');
const Video = require('../../../models/Video');


exports.addVideo = async (req, res) => {
  const { name, userId } = req.body
  try {
    if (!name || !userId ){
      return res.status(400).send({
        message: 'Missing required field(s)!'
      });
    }

    const addVideo = await Video.create(req.body)

    res.json(addVideo);
    
  } catch (err) {
    res.status(500).send({
      err : 'Internal server error!'
    });
  }
}


