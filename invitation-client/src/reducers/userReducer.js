export default (state={
  data: {},
  status: 'success',
}, action) => {
  switch (action.type) {
    case "LOGGED_IN":
      return {
        data: action.payload.user,
        status: `user ${action.payload.user.id}`
      };

    case "NOT_LOGGED_IN":
      return {
        data: {},
        status: 'no current user'
      };

    case "LOGGING_IN":
      return {
        data: {},
        status: 'logging in',
      };
      
    case "LOGGING_OUT":
      return {
        ...state,
        status: 'logging out'
      }

    default:
      return state;
  }
}