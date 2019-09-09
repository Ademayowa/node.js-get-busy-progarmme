const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSignUpInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 3, max: 25 })) {
    errors.name = 'Name must be between 3 and 25 characters';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Insert your email';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Insert your password';
  }

  if (!Validator.isLength(data.password, { min: 4, max: 10 })) {
    errors.password = 'Password must be at least 4 characters';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Insert your password';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Incorrect email or password';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
