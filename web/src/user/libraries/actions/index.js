import $ from 'jquery';

export function materialList(user_id){
  return function(dispatch){
     $.ajax({
        type: "GET",
        contentType: "application/json",
        url: '/api/material/user/completedMaterials/'+ user_id,
        dataType: "json",
        success: function(response) {
          return dispatch({ type: 'MATERIAL_LIST', value: response});
        }
      });
  };
}
