export default (state={
  data: {},
  authorize: false,
  status: 'none loaded',
  loading: false
}, action) => {
  switch (action.type) {
    case "LOADING_EVENT":
      return {
        data: {},
        authorize: false,
        status: 'loading',
        loading: true
      };
    
    case "ADD_EVENT":
      return {
        data: action.payload.event,
        authorize: action.payload.authorize,
        status: 'created',
        loading: false
      };

    case "GET_EVENT":
      return {
        data: action.payload.event,
        authorize: action.payload.authorize,
        status: 'loaded',
        loading: false
      };

    case "EVENT_ERROR":
      return {
        data: {},
        authorize: false,
        status: action.payload || 'error',
        loading: false
      };
    
      case "CLEAR_EVENT":
        return {
          data: {},
          authorize: false,
          status: 'cleared',
          loading: false
        }

      case "EDIT_EVENT":
        return {
          ...state,
          status: 'editing event'
        }

      case "UPDATING_EVENT":
        return {
          ...state,
          status: 'updating event',
          loading: true
        }
      
      case "UPDATED_EVENT":
        return {
          data: action.payload.event,
          authorize: action.payload.authorize,
          status: 'updated event',
          loading: false
        }

    default:
      return state;
  }
}