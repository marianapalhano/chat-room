import db from './firestore.js';
import { collection, doc, setDoc, Timestamp, onSnapshot, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";

const chats = collection(db, "chats");

class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = chats;
    }
    async addChat(message) {
        // format a chat object
        const now = new Date();
        const chat = {
            message: message,
            username: this.username,
            room: this.room,
            created_at: Timestamp.fromDate(now)
        }
        const chatRef = doc(collection(db, "chats"));
        const response = await setDoc(chatRef, chat);
        return response;
    }

    async getChats(callback) {
        const q = query(this.chats, where('room', '==', this.room));
        const querySnapshot = await getDocs(q);
        querySnapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
                //update the ui
                callback(change.doc.data());
            }     
        })
    }
}

const chatroom = new Chatroom('gaming', 'shaun');
chatroom.getChats((data) => {
    console.log(data)
})

// chatroom.getChats()
//     .then((data) => {
//         console.log(data);
//     }).catch(err => {
//         console.log(err);
//     })
