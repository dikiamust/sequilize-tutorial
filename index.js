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

app.get('/', (req, res) => res.send('Welcome to Api Sequelize Tutorial'))

app.use(authRouter)
app.use(videoRouter)

const port = process.env.PORT || 8080

app.listen(8080, () => console.log(`Server is listening on http://locahost:${port}`));

