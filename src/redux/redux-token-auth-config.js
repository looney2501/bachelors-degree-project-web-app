import { generateAuthActions } from 'redux-token-auth'

const config = {
  authUrl: process.env.REACT_APP_AUTH_URL,
  userAttributes: {
    firstName: 'first_name',
  },
  userRegistrationAttributes: {
    firstName: 'first_name',
  },
}

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config)

export {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
}
