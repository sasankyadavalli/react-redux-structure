export default function userLibraryReducer(state = [], action) {

  switch (action.type) {
    case 'MATERIAL_LIST': {
     return action.value || [];
    }
    default:
      return state;
  }
}
