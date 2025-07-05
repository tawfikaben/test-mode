const firebaseConfig = {
    apiKey: "AIzaSy...", // استبدل ببيانات مشروعك
    authDomain: "test-rules-demo.firebaseapp.com",
    projectId: "test-rules-demo",
    storageBucket: "test-rules-demo.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
