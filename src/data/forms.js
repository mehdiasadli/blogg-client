import * as yup from 'yup'
import { formatName, formatUsername } from '../utils/format'
import { lowCaseRegex, numRegex, upCaseRegex } from './regex'

export const loginForm = {
  username: {
    name: 'username',
    placeholder: 'Username',
    validate: yup.string().required('Username is required'),
    max: 30
  },
  password: {
    name: 'password',
    placeholder: 'Password',
    validate: yup.string().required('Password is required'),
    password: true
  }
}

export const registerForm = {
  firstName: {
    name: 'firstName',
    placeholder: 'First Name',
    validate: yup.string().required('First Name is required'),
    format: formatName,
    max: 30
  },
  lastName: {
    name: 'lastName',
    placeholder: 'Last Name',
    validate: yup.string().required('Last Name is required'),
    format: formatName,
    max: 30
  },
  username: {
    name: 'username',
    placeholder: 'Username',
    validate: yup.string().required('Username is required'),
    format: formatUsername,
    max: 30
  },
  password: {
    name: 'password',
    placeholder: 'Password',
    validate: yup
      .string()
      .min(7, 'Password must be between 7 and 30 characters')
      .max(30, 'Password must be between 7 and 30 characters')
      .matches(lowCaseRegex, 'Password must have a lowercase character')
      .matches(upCaseRegex, 'Password must have a uppercase character')
      .matches(numRegex, 'Password must have a number')
      .required('Password is required'),
    complete: 'password',
    password: true
  },
  confirmPassword: {
    name: 'confirmPassword',
    placeholder: 'Confirm Password',
    validate: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    complete: 'password',
    password: true
  }
}
