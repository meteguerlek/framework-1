export default {
  passes(value: any, parameters: Array<any>, formData: object, currentField) {
    return formData[`${currentField}Confirmed`] === value;
  }
};
