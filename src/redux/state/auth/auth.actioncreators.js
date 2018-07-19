import { GET_TOKEN } from '../../actions/action.types';

export const getToken = payload => ({ type: GET_TOKEN, payload });

/**
  * Sign Up to Firebase
  */
export function signUp() {}

export function getMemberData() {}

/**
  * Login to Firebase with Email/Password
  */
export function login() {}

/**
  * Reset Password
  */
export function resetPassword() {}

/**
  * Update Profile
  */
export function updateProfile() {}

/**
  * Logout
  */
export function logout() {}
