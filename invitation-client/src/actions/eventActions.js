import axios from "axios";

axios.defaults.xsrfCookieName = 'CSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';
axios.defaults.withCredentials = true;

export const getEvent = (id) => (
  dispatch => {
    dispatch({type: 'LOADING_EVENT'});
    axios.get(`http://localhost:3001/events/${id}`)
    .then(response => {
      console.log(response)
      if (response.data.event) {
        dispatch({type: 'GET_EVENT', payload: response.data.event})
      } else {
        dispatch({type: 'EVENT_ERROR', payload: response.statusText})
      }
    })
    .catch(() => dispatch({type: 'EVENT_ERROR', payload:'event not found'}))
  }
)

export const addEvent = (event, pushHistory) => (
  dispatch => {
    axios.post('http://localhost:3001/events', {event: event})
    .then(response => {
      if (response.data.event) {
        dispatch({type: 'GET_EVENT', payload: response.data.event})
      } else {
        dispatch({type: 'EVENT_ERROR', payload: response.data.errors})
      }
      return response.data.event
    })
    .then(event => {
      pushHistory(event)
    })
    .catch(() => dispatch({type: 'EVENT_ERROR', payload:'failed to create event'}))
  }
)

export const clearEvent = () => (
  dispatch => {
    dispatch({type:'CLEAR_EVENT'})
  }
)