import db from './firestore.js';
import { collection, doc, setDoc, Timestamp, onSnapshot, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";

const chats = collection(db, "chats");

export class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = chats;
        this.unsubscribe;
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

    getChats(callback) {
        const q = query(this.chats, where('room', '==', this.room), orderBy('created_at'));
        this.unsubscribe = onSnapshot(q, querySnapshot => {
            querySnapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    //update the ui
                    callback(change.doc.data());
                }     
            }); 
        });        
    }

    updateName(username) {
        this.username = username;
        localStorage.setItem('username', username);
    }

    updateRoom(room) {
        this.room = room;
        console.log('room updated');
        if (this.unsubscribe) {
            this.unsubscribe();
        }        
    }
}

// setTimeout(() => {
//     chatroom.updateRoom('general');
//     chatroom.updateName('yoshi');
//     chatroom.getChats((data) => {
//         console.log(data);
//     });
//     chatroom.addChat('hello!');
// }, 3000);