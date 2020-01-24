export const getEvent = (id) => (
  dispatch => {
    dispatch({type: 'LOADING_EVENT'});
    fetch(`http://localhost:3001/events/${id}`)
    .then(resp => resp.json())
    .then(data => {
      dispatch({
        type: 'GET_EVENT',
        payload: data.event
      })
    })
  }
)

export const addEvent = (event, pushHistory) => (
  dispatch => {
    fetch('http://localhost:3001/events', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({event})
    })
    .then(resp => resp.json())
    .then(data => {
      dispatch({
        type: 'ADD_EVENT',
        payload: data.event
      })
      return data.event
    })
    .then(event => {
      pushHistory(event)
    })
  }
)