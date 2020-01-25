import axios from 'axios';

axios.defaults.xsrfCookieName = 'CSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';
axios.defaults.withCredentials = true;

export const createUser = (userParams) => (
  dispatch => {
    axios.post('http://localhost:3001/users', {user: userParams})
    .then(response => {
      if (response.statusText === 'Created') {
        dispatch({type: 'LOGGED_IN', payload: response.data})
        window.location.reload();
      } else {
        dispatch({type: 'LOGIN_ERROR', payload: response.data});
      }
    })
    .catch(() => dispatch({type: 'USER_ERROR', payload: 'Unauthorized'}))
  }
)

export const getUser = (id) => (
  dispatch => {
    axios.get(`http://localhost:3001/users/${id}`)
    .then(response => {
      console.log(response)
    })
    .catch(() => dispatch({type: 'USER_ERROR', payload: 'Unauthorized'}))
  }
)