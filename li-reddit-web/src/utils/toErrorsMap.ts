interface FieldError {
  field: string;
  message: string;
}

export const toErrorsMap = (errors: FieldError[]) => {
                // => expects type { "string": "string"}
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    //the key is the field and the value is the message
    errorMap[field] = message;
  });
  return errorMap;

  // => from an empty array expectding a record of a string key and string value
  // to this... errorMap ={ "username": "messgage"}
};
