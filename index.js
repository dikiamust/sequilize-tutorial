const express = require('express');
const dotenv = require('dotenv').config();
const db = require('./db/db');
const authRouter = require('./modules/auth/routes/auth.routes');
const videoRouter = require('./modules/video/routes/video.routes')
const morgan = require('morgan')
const notFoundRout = require('./utils/notFoundRout')
const errorHandlerMiddleware = require('./utils/errorHandler')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan(':method :url :response-time :status'))

app.get('/', (req, res) => res.send('Welcome to Api Sequelize Tutorial'))

app.use(authRouter)
app.use(videoRouter)

// middleware
app.use(notFoundRout);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8080

const start = async () => {
    try {
      app.listen(port, () =>
       console.log(`Server is listening on http://localhost:${port}`)
      );
    } catch (error) {
      console.log(error);
    }
};
  
start();

