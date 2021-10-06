// dom queries
const chatList = document.querySelector('.chat-list');

// class instances 
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('gaming', 'shaun');

// get the chats and render
chatroom.getChats((data) => {
    console.log(data)
})