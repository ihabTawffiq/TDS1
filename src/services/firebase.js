import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/firebase-functions";
<<<<<<< HEAD
import 'firebase/auth';





=======
>>>>>>> 47376ffc458fe4e2fab127daa1c6300adbb09b14
const firebaseConfig = {
  apiKey: "AIzaSyDhU6o2tAq3pmfO01SUuVqDBVCnOtKt0p4",
  authDomain: "test-f3aab.firebaseapp.com",
  databaseURL: "https://test-f3aab.firebaseio.com",
  projectId: "test-f3aab",
  storageBucket: "test-f3aab.appspot.com",
  messagingSenderId: "926668681850",
  appId: "1:926668681850:web:77745633ee953b0a9d81c3",
  measurementId: "G-6ZHVFZYWYQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const db = firebase.firestore();
<<<<<<< HEAD
export const auth =firebase.auth();

=======
>>>>>>> 47376ffc458fe4e2fab127daa1c6300adbb09b14

db.settings({ timestampsInSnapshots: true });

export default firebase;