const axios = require('axios');

const url = 'http://localhost:8000/api/video'

async function start() {
    try {
      const response = await axios.get(url)
      const rows = await response.json()
      console.log('jjjj', rows)
    //   createBreedList(data.message)
    } catch (e) {
      console.log("There was a problem fetching the video list.", e)
    }
}
  
start()