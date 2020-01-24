import axios from 'axios';

axios.defaults.xsrfCookieName = 'CSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';
axios.defaults.withCredentials = true;

export const loginStatus = () => (
  dispatch => {
    axios.get('http://localhost:3001/logged_in')
    .then(response => {
      if (response.data.logged_in) {
        dispatch({type: 'LOGGED_IN', payload: response.data})
      } else {
        dispatch({type: 'NOT_LOGGED_IN'})
      }
    })
    .catch(error => console.log('api errors:', error))
  }
)

export const login = (username, password) => (
  dispatch => {
    dispatch({type: 'LOGGING_IN'});
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password})
    })
  }
)

export const logout = () => (
  dispatch => {
    dispatch({type: 'LOGGING OUT'});
  }
)