import { Chatroom } from "./chat.js";
import { ChatUI } from "./ui.js";

// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-msg');

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
})

// class instances 
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', 'shaun');

// get the chats and render
chatroom.getChats(data => chatUI.render(data));