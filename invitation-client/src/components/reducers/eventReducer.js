export default (state=[], action) => {
  switch (action.type) {
    case "ADD_EVENT":
      console.log(action);
      return state;
    default:
      return state;
  }
}