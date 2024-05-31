const { body } = require('express-validator');

const register = [
    body('username')
      .notEmpty().withMessage('username is required'),
    body('password')
      .notEmpty().withMessage('password is required')
      .matches(/^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/)
      .withMessage('The password must be 8-16 characters long and contain at least one number and one letter'),
    body('email')
      .notEmpty().withMessage('email is required')
      .isEmail().withMessage('e-mail format error'),
    body('is_business')
      .notEmpty().withMessage('user type is required'),
];

const login = [
    body('email')
        .notEmpty().withMessage('email is required')
        .isEmail().withMessage('e-mail format error'),
    body('password')
        .notEmpty().withMessage('password is required'),
];

module.exports = {
    register,
    login
};
