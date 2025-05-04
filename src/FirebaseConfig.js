// firebaseConfig.js - midlertidig mock av Firebase Auth

export const auth = {
  currentUser: null,
};

// Simulerer innlogging
export const signInWithEmailAndPassword = async (auth, email, password) => {
  auth.currentUser = { email };
  return { user: auth.currentUser };
};

// Simulerer oppretting av bruker
export const createUserWithEmailAndPassword = async (auth, email, password) => {
  auth.currentUser = { email };
  return { user: auth.currentUser };
};

// Simulerer utlogging
export const signOut = async (auth) => {
  auth.currentUser = null;
};

// Simulerer overvåkning av innloggingsstatus
export const onAuthStateChanged = (auth, callback) => {
  setTimeout(() => {
    callback(auth.currentUser); // send nåværende bruker
  }, 0);

  // Returner en "unsubscribe"-funksjon som ikke gjør noe
  return () => {};
};
