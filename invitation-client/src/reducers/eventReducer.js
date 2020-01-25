export default (state={
  data: {},
  status: 'none loaded',
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
      return {
        data: action.payload,
        status: 'loaded',
        loading: false
      };

    case "EVENT_ERROR":
      return {
        data: {},
        status: action.payload || 'error',
        loading: false
      };
    
      case "CLEAR_EVENT":
        return {
          data: {},
          status: 'cleared',
          loading: false
        }

    default:
      return state;
  }
}