const dotenv = require('dotenv').config();
const app = require('./express')

const port = process.env.PORT || 8000

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