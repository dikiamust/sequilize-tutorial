const axios = require('axios');

document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;
    login(email, password);
});

const login = async (email, password) => {
    try {
      const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:4000/api/sign-in',
        data: {
          email,
          password
        }
      });
      console.log(res);
    } catch (err) {
      console.log(err.response.data);
    }
};