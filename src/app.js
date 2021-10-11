import { Chatroom } from "./chat.js";
import { ChatUI } from "./ui.js";

// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-msg');
const rooms = document.querySelector('.chat-rooms');

// add a new chat
newChatForm.addEventListener('submit', evt => {
    evt.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
});

// update username
newNameForm.addEventListener('submit', evt => {
    evt.preventDefault();
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    newNameForm.reset();
    updateMsg.innerText = `Your name was updated to ${newName}`;
    setTimeout(() => updateMsg.innerText = '', 3000);
});

// update chat room
rooms.addEventListener('click', evt => {
    if (evt.target.tagName === 'BUTTON') {
        chatUI.clear();
        chatroom.updateRoom(evt.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
});

// check localstorage for username
const username = localStorage.username ? localStorage.username : 'anonymous';

// class instances 
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

// get the chats and render
chatroom.getChats(data => chatUI.render(data));