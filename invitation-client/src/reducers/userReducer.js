export default (state={
  data: {},
  authorize: false,
  status: 'none loaded'
}, action) => {
  switch (action.type) {
    case "GETTING_USER":
      return {
        ...state,
        status: 'fetching user'
      };

    case "GOT_USER":
      return {
        data: action.payload.user,
        authorize: action.payload.authorize,
        status: 'loaded'
      };

    case "USER_ERROR":
      return {
        data: action.payload,
        authorize: false,
        status: 'failure'
      };

    case "CLEAR_USER":
      return {
        data: {},
        authorize: false,
        status:'cleared'
      }
    
    default:
      return state;
  }
}