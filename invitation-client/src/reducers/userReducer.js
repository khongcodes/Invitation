export default (state={
  data: {},
  status: 'success'
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
        status: 'success'
      }

    case "GET_USER_ERROR":
      return {
        data: {},
        status: 'failure'
      }
    
    default:
      return state;
  }
}