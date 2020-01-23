export default (state=[], action) => {
  switch (action.type) {
    case "ADD_EVENT":
      return [action.payload.event];
    case "GET_EVENT":
      console.log(action);
      return state;
    default:
      return state;
  }
}