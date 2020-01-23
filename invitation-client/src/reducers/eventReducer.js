export default (state={
  data: {},
  status: 'success',
  loading: false
}, action) => {
  switch (action.type) {
    case "LOADING_EVENT":
      console.log('loading event')
      return {
        data: {},
        status: 'loading',
        loading: true
      };
    
    case "ADD_EVENT":
      return {
        data: action.payload,
        status: 'created',
        loading: false
      };

    case "GET_EVENT":
      return action.payload !== undefined ? {
        data: action.payload,
        status: 'loaded',
        loading: false
      } : {
        data: {},
        status: 'no match',
        loading: false
      };

    default:
      return state;
  }
}