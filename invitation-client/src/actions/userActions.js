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

export const logout = () => (
  dispatch => {
    dispatch({type: 'LOGGING OUT'});
  }
)