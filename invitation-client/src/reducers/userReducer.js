export default (state={
  data: {},
  status: 'success',
}, action) => {
  switch (action.type) {
    case "LOGGING IN":
      return {
        data: {},
        status: 'logging in',
      };

    case "LOGGING OUT":
      return {
        ...state,
        status: 'logging out'
      }

    default:
      return state;
  }
}