import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  query,
  orderByKey,
  limitToLast,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAEkwzFIEr6NSwBVRdeWtOBWG47rW9zkOM",
  authDomain: "esp8266-firebase-voltage.firebaseapp.com",
  projectId: "esp8266-firebase-voltage",
  storageBucket: "esp8266-firebase-voltage.firebasestorage.app",
  messagingSenderId: "448494477970",
  appId: "1:448494477970:web:e95a975780897323b7bc4b",
  measurementId: "G-WJQTPCZ0Q0",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue, query, orderByKey, limitToLast };
