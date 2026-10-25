import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBPIhrGW1Jblwp84guhydvxLc9BMMuk8ZE",
  authDomain: "track02smanda.firebaseapp.com",
  projectId: "track02smanda",
  storageBucket: "track02smanda.firebasestorage.app",
  messagingSenderId: "703953923222",
  appId: "1:703953923222:web:b0c84fe440d89d90d0a6b7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);