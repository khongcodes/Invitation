import axios from 'axios';

axios.defaults.xsrfCookieName = 'CSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';
axios.defaults.withCredentials = true;

export const login = (username, password) => (
  dispatch => {
    dispatch({type: 'LOGGING IN'});
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password})
    })
  }
)

export const loginStatus = () => (
  dispatch => {
    dispatch({type: 'LOGGING IN'});
    axios.get('http://localhost:3001/logged_in')
    .then(response => {
      if (response.data.logged_in) {
        console.log('user: ', response.user)
      } else {
        console.log(response)
      }
    })
    .catch(error => console.log('api errors:', error))
  }
)

export const logout = () => (
  dispatch => {
    dispatch({type: 'LOGGING OUT'});
  }
)