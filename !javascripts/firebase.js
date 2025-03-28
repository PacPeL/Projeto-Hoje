// firebase.js (versión corregida)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";

import { 
  getDataBase,

} from "https://projeto-senai-8a855-default-rtdb.firebaseio.com/";

const firebaseConfig = {
  apiKey: "AIzaSyDLY_Afynn2sBtEJ1246FD2btvBJ5YCRlo",
  authDomain: "projeto-senai-8a855.firebaseapp.com",
  databaseURL: "https://projeto-senai-8a855-default-rtdb.firebaseio.com",
  projectId: "projeto-senai-8a855",
  storageBucket: "projeto-senai-8a855.firebasestorage.app",
  messagingSenderId: "392156566497",
  appId: "1:392156566497:web:984c350261b5c81abdf8a0"
  
}

const app = initializeApp(firebaseConfig);
const db = getDataBase(app);

export { 
  db, 

};