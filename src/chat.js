import db from './firestore.js';
import { collection, doc, setDoc, Timestamp, onSnapshot, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";

const chats = collection(db, "chats");

class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = chats;
        this.unsub;
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
        const q = query(this.chats, where('room', '==', this.room), orderBy('created_at'));
        const querySnapshot = await getDocs(q);
        querySnapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
                //update the ui
                callback(change.doc.data());
            }     
        });            
    }

    // import { collection, query, where, onSnapshot } from "firebase/firestore";

    // const q = query(collection(db, "cities"), where("state", "==", "CA"));
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    // const cities = [];
    // querySnapshot.forEach((doc) => {
    //     cities.push(doc.data().name);
    // });
    // console.log("Current cities in CA: ", cities.join(", "));
    // });

    // async getChats(callback) {
    //     const q = query(this.chats, where('room', '==', this.room), orderBy('created_at'));
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.docChanges().forEach(change => {
    //         if (change.type === 'added') {
    //             //update the ui
    //             callback(change.doc.data());
    //         }     
    //     });            
    // }

    updateName(username) {
        this.username = username;
    }

    updateRoom(room) {
        this.room = room;
        console.log('room updated');
        
        //this.unsub();
    }
}

const chatroom = new Chatroom('gaming', 'shaun');
chatroom.getChats((data) => {
    console.log(data)
})

chatroom.updateRoom('general');

// chatroom.getChats()
//     .then((data) => {
//         console.log(data);
//     }).catch(err => {
//         console.log(err);
//     })
