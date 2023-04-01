// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required
import { initializeApp } from 'firebase/app';

// Add the Firebase products and methods that you want to use
import {
  getAuth, 
  EmailAuthProvider, 
  signOut, 
  onAuthStateChanged
} from 'firebase/auth';
import {} from 'firebase/firestore';

import * as firebaseui from 'firebaseui';

// Document elements
const startRsvpButton = document.getElementById('startRsvp');
const guestbookContainer = document.getElementById('guestbook-container');

const form = document.getElementById('leave-message');
const input = document.getElementById('message');
const guestbook = document.getElementById('guestbook');
const numberAttending = document.getElementById('number-attending');
const rsvpYes = document.getElementById('rsvp-yes');
const rsvpNo = document.getElementById('rsvp-no');

let rsvpListener = null;
let guestbookListener = null;

let db, auth;

async function main() {
  // Add Firebase project configuration object here
  const firebaseConfig = {
    apiKey: "AIzaSyBh84zC8K1MsThWyi_Q9sdgNn9ZnMT8_Go",
    authDomain: "fir-web-codelab-8cb3d.firebaseapp.com",
    projectId: "fir-web-codelab-8cb3d",
    storageBucket: "fir-web-codelab-8cb3d.appspot.com",
    messagingSenderId: "484422213671",
    appId: "1:484422213671:web:f4cc9871b5fee582daee02"
  };

  initializeApp(firebaseConfig);
  auth = getAuth();

  // FirebaseUI config
  const uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      // Email / Password Provider.
      EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // Handle sign-in.
        // Return false to avoid redirect.
        return false;
      },
    },
  };

  const ui = new firebaseui.auth.AuthUI(auth);

  startRsvpButton.addEventListener("click", 
  () => {
        if (auth.currentUser) {
          //if user is signed in: user can sign out
          signOut(auth);
        } else {
          //no user is signed in
          ui.start("#firebaseui-auth-container", uiConfig);
        }
  });
  //Listen to the current auth state
  onAuthStateChanged(auth, user => {
    if(user) {
      startRsvpButton.textContent = 'LOGOUT';
    } else {
      startRsvpButton.textContent = 'RSVP';
    }
  });
}
main();
