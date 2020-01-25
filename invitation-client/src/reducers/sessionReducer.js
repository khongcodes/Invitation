export default (state={
  data: {},
  status: 'success',
}, action) => {
  switch (action.type) {
    case "LOGGED_IN":
      return {
        data: {id: action.payload.id, name: action.payload.name},
        status: 'logged in'
      };

    case "NOT_LOGGED_IN":
      return {
        data: {},
        status: 'no user'
      };

    case "LOGGING_IN":
      return {
        ...state,
        status: 'logging in',
      };

    case "LOGGING_OUT":
      return {
        ...state,
        status: 'logging out'
      }

    case "LOGIN_ERROR":
      return {
        data: {},
        status: action.payload
      }
    

    default:
      return state;
  }
}