import $ from 'jquery';

export function saveUserLoginDataToStore(value){
  return { type: 'POST_USER_LOGIN', value };
}

export function getNotificationList(notificationObj) {
  return function(dispatch) {
    $.ajax({
      type: 'GET',
      contentType: "application/json",
      url: '/api/member/notifications/list/'+ notificationObj.user_id + '/' + notificationObj.org_id,
      dataType: "json",
      success: function(response) {
        console.log(response.result);
        return dispatch({type: 'GET_NOTIFICATION_LIST', value: response.result});
      }
    });
  };
}

export function getOrgDetails(domain) {
  return $.post('/api/org/getorgdetails', {domain});
}
