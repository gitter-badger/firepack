/* eslint-env browser */

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  Actions

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

import createUserWithEmailAndPassword from './auth/createUserWithEmailAndPassword.action';
import signInWithEmailAndPassword from './auth/signInWithEmailAndPassword.action';
import sendPasswordResetEmail from './auth/sendPasswordResetEmail.action';
import signInWithPopup from './auth/signInWithPopup.action';
import signOut from './auth/signOut.action';

export const auth = {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  signOut,
};

export default {
  auth,
};
