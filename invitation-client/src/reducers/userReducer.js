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

    case "USER_FORM_ERROR":
      return {
        data: action.payload,
        authorize: false,
        status: 'form error'
      }

    case "CLEAR_USER":
      return {
        data: {},
        authorize: false,
        status:'cleared'
      }

    case "AUTHENTICATING_USER":
      return {
        ...state,
        status: 'checking password'
      }

    case "UPDATED_USER":
      return {
        data: action.payload.user,
        authorize: action.payload.authorize,
        status: 'success'
      }
    
    default:
      return state;
  }
}