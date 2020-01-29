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
    .catch(() => dispatch({type: 'USER_ERROR', payload: {message:'User could not be created.'}}))
  }
)

export const getUser = (id) => (
  dispatch => {
    dispatch({type: 'GETTING_USER'})
    axios.get(`http://localhost:3001/users/${id}`)
    .then(response => {
      dispatch({type:'GOT_USER', payload: {
        user: response.data.user,
        authorize: response.data.authorize
      }})
    })
    .catch(() => dispatch({type: 'USER_ERROR', payload: {message:'User not found.'}}))
  }
)

export const clearUser = () => (
  dispatch => {
    dispatch({type:'CLEAR_USER'})
  }
)

// code similar to getUser - but must pass an authorization check
export const editUser = (id, loadUser) => (
  dispatch => {
    dispatch({type: 'GETTING_USER'});
    axios.get(`http://localhost:3001/users/${id}/edit`)
    .then(response => {
      dispatch({type: 'GOT_USER', payload: {
        user: response.data.user,
        authorize: response.data.authorize
      }})
      return response.data.user
    })
    .then(({username, img_url, name, bio}) => {
      loadUser({username, img_url, name, bio})
    })
    .catch(error => {
      if (error.message.endsWith('404')) {
        dispatch({type: 'USER_ERROR', payload: {message:'User not found.'}})
      } else {
        dispatch({type: 'USER_ERROR', payload: {message: 'User is not authorized to edit this resource.'}})
      }
    })
  }
)

export const updateUser = (id, user, pushHistory) => (
  dispatch => {
    axios.patch(`http://localhost:3001/users/${id}`, {user: user})
    .then(response => {
      dispatch({type: 'UPDATED_USER', payload: {
        user: response.data.user,
        authorize: response.data.user.authorize
      }})
      return response;
    })
    .then(userData => {
      pushHistory(userData.data.user);
    })
    .catch(error => {
      if (error.message.endsWith('500')) {
        dispatch({type: 'USER_FORM_ERROR', payload: {message: 'Authorization failed - try entering the password again.'}})
      } else if (error.message.endsWith('401')) {
        dispatch({type: 'USER_FORM_ERROR', payload: {message: 'Authorization failed - try entering the password again.'}})
      }
    })

    // authorize user with passwordcheck
    // return result, push history
    // catch if authorization failed
    // catch if error update failed
  }
)