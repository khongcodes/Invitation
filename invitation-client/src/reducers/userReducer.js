export default (state={
  data: {},
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
        data: action.payload,
        status: 'loaded'
      };

    case "USER_ERROR":
      return {
        data: action.payload,
        status: 'failure'
      };

    case "CLEAR_USER":
      return {
        data: {},
        status:'cleared'
      }
    
    default:
      return state;
  }
}