// firebaseConfig.js - forbedret mock med støtte for eventoppdatering

export const auth = {
  currentUser: null,
  _listeners: [], // 🔁 Legg til lyttere for onAuthStateChanged
};

// 🔁 Notify all onAuthStateChanged listeners
const notifyAuthChange = () => {
  auth._listeners.forEach((callback) => callback(auth.currentUser));
};

// Simulerer innlogging
export const signInWithEmailAndPassword = async (auth, email, password) => {
  auth.currentUser = { email };
  notifyAuthChange(); // 🔥 Oppdater listenerne
  return { user: auth.currentUser };
};

// Simulerer oppretting av bruker
export const createUserWithEmailAndPassword = async (auth, email, password) => {
  auth.currentUser = { email };
  notifyAuthChange(); // 🔥
  return { user: auth.currentUser };
};

// Simulerer utlogging
export const signOut = async (auth) => {
  auth.currentUser = null;
  notifyAuthChange(); // 🔥
};

// Simulerer overvåkning av innloggingsstatus
export const onAuthStateChanged = (auth, callback) => {
  auth._listeners.push(callback);
  callback(auth.currentUser); // Kjør callback umiddelbart

  // Returner unsubscribe-funksjon
  return () => {
    auth._listeners = auth._listeners.filter((cb) => cb !== callback);
  };
};
