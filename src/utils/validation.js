const validateObject = (obj, schema) => {
  const { error } = schema.validate(obj);
  return error ? error.details[0].message : null;
};


export default validateObject;
