import { body } from 'express-validator'

export const createValidator = [
  body('username', 'username does not Empty').not().isEmpty(),
  body('email', 'Invalid does not Empty').not().isEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('password', 'password does not Empty').not().isEmpty(),
  body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
  body('role', 'Role must be either admin or user').isIn(['admin', 'user'])
]