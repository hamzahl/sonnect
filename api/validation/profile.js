const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.university = !isEmpty(data.university) ? data.university : '';
  data.course = !isEmpty(data.course) ? data.course : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to between 2 and 40 characters';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }

  if (Validator.isEmpty(data.university)) {
    errors.university = 'University field is required';
  }

  if (Validator.isEmpty(data.course)) {
    errors.course = 'Course field is required';
  }
  

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
