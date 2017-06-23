export default function notificationReducer(state = {}, action) {

  switch (action.type) {
    case 'GET_NOTIFICATION_LIST': {
      console.log(action.value);
      return action.value;
    }
    default:
      return state;
  }
}
