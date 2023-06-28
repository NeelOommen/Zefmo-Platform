import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAg-kS6-1XRd_fptvTIiG71KXh7LOZFX6w",
  authDomain: "zefnau-backend.firebaseapp.com",
  projectId: "zefnau-backend",
  storageBucket: "zefnau-backend.appspot.com",
  messagingSenderId: "201130665262",
  appId: "1:201130665262:web:c64c30107ae5742add06bf",
  measurementId: "G-R2G8DVH28D"
};

//test env
// const firebaseConfig = {
//     apiKey: "AIzaSyBdx6Vi70RBG6jn7-LtPZn9M6qVxCl3oOQ",
//     authDomain: "zefnau-backend-test.firebaseapp.com",
//     projectId: "zefnau-backend-test",
//     storageBucket: "zefnau-backend-test.appspot.com",
//     messagingSenderId: "1088370606120",
//     appId: "1:1088370606120:web:2f6a5260bfbaa1da95f51d"
// };

export const app = initializeApp(firebaseConfig);

export default app;
export const auth = getAuth(app)
export const db = getFirestore(app)