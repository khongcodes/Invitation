export const getEvent = () => (
  dispatch => {

  }
)

export const addEvent = (event, pushHistory) => (
  dispatch => {
    fetch('v1/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({event})
    })
    .then(resp => resp.json())
    .then(event => {
      dispatch({
        type: 'ADD_EVENT',
        payload: event
      })
      return event
    })
    .then(data => {
      pushHistory(data.event)
    })
  }
)