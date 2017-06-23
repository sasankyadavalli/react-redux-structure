export function validate(name, value, validators = [], errors = {}){
  for(let validator of validators) {
      if(validator == "required"){
        if(!value){
          errors[name] = 'This field is required';
          break;
        } else {
          delete errors[name];
        }
      }
      if(validator == "max15"){
        if(value.length > 15){
          errors[name] = 'This field should be 15';
          break;
        } else {
          delete errors[name];
        }
      }
    }
    return errors;
}


