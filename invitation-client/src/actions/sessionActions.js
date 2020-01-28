import axios from 'axios';

axios.defaults.xsrfCookieName = 'CSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';
axios.defaults.withCredentials = true;

export const loginStatus = () => (
  dispatch => {
    axios.get('http://localhost:3001/logged_in')
    .then(response => {
      if (response.data.logged_in) {
        dispatch({type: 'LOGGED_IN', payload: response.data.user})
      } else {
        dispatch({type: 'NOT_LOGGED_IN'})
      }
    })
    .catch(error => console.log('api errors:', error))
  }
)

export const login = (userParams) => (
  dispatch => {
    dispatch({type: 'LOGGING_IN'});
    axios.post('http://localhost:3001/login', {user: userParams})
    .then(response => {
      if (response.data.logged_in) {
        dispatch({type: 'LOGGED_IN', payload: response.data.user});
        window.location.reload();
      } else {
        dispatch({type: 'LOGIN_ERROR', payload: response.data});
      }
    })
    .catch(() => dispatch({type: 'LOGIN_ERROR', payload: 'Unauthorized'}))
  }
)

export const logout = () => (
  dispatch => {
    dispatch({type: 'LOGGING_OUT'});
    axios.delete('http://localhost:3001/logout')
    .then(response => {
      dispatch({type: 'NOT_LOGGED_IN'});
      window.location.reload();
    })
  }
)