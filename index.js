const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const db = require('./db/db');
const authRouter = require('./modules/auth/routes/auth.routes');
const videoRouter = require('./modules/video/routes/video.routes')
const morgan = require('morgan')

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan(':method :url :response-time :status'))

app.use(authRouter)
app.use(videoRouter)

app.listen(8080, () => console.log('server listening on port 8080'));

