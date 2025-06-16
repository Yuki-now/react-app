// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';//認証機能用
// Firebase構成オブジェクト(コンソールからコピペ)
const firebaseConfig = {
  apiKey: "AIzaSyC4thYmTQLLUT8p5Gf63EH0MwxpDgkxLEk",
  authDomain: "final-work-52690.firebaseapp.com",
  projectId: "final-work-52690",
  storageBucket: "final-work-52690.firebasestorage.app",
  messagingSenderId: "954079654666",
  appId: "1:954079654666:web:d0e62b33166386d2a840f3"
  };
// 初期化
const app = initializeApp(firebaseConfig);

// Firestoreデータベースを使う準備
const db = getFirestore(app);
// Firebase認証(Auth)を使う準備
const auth = getAuth(app); // 認証サービス本体
const provider = new GoogleAuthProvider(); // Googleログイン専用の「認証プロバイダ」
// 他のファイルでも使えるように、エクスポート
export { db, auth, provider };