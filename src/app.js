import { Chatroom } from "./chat.js";
import { ChatUI } from "./ui.js";

// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');

// add a new chat
newChatForm.addEventListener('submit', evt => {
    evt.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
})

// class instances 
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', 'shaun');

// get the chats and render
chatroom.getChats(data => chatUI.render(data));