const validateResponse = (obj, schema) => {
  const { error } = schema.validate(obj);
  return error ? error.details[0].message : null;
};

export default validateResponse;
