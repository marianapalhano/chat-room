    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
    import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";
    
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCFR02azAjzKCnVvx71eDcTn9dCfcHKid0",
        authDomain: "chat-room-2bc0b.firebaseapp.com",
        projectId: "chat-room-2bc0b",
        storageBucket: "chat-room-2bc0b.appspot.com",
        messagingSenderId: "895506984990",
        appId: "1:895506984990:web:2902ee83c0a23fa5f3fe0f"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    export default db;