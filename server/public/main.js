const socket = io(),
    nicknameForm = document.querySelector('.js-nickname'),
    nicknameInput = nicknameForm.querySelector('.js-input'),
    messageForm = document.querySelector('.js-message'),
    messageInput = messageForm.querySelector('.js-input'),
    messageList = document.querySelector('.js-messageList'),
    creatorCSS = document.querySelector('.js-creator'),
    closingChat = document.querySelector('.js-out');

const NICKNAME = "nickname";
const YOURS = "yours";
const MINE = "mine";

console.log(socket);

let nickName = localStorage.getItem(NICKNAME);
messageForm.style.display = "none";

if(nickName){
    messageForm.style.display = "block";
    nicknameForm.style.display = "none";
}

const setNickname = event => {
    event.preventDefault();
    const InputValue = nicknameInput.value;

   localStorage.setItem(
       NICKNAME, InputValue);

    nickName = nicknameInput.value;
    nicknameForm.style.display = "none";
    messageForm.style.display = "block";
}

const addMessage = (message, creator) => {

    const newMessage = document.createElement("li");
    const MessageContent = document.createTextNode(creator + " : " +message);
    
    newMessage.appendChild(MessageContent);
    
   let CSS = (creator === nickName ? "MINE_CLASS" : "YOURS_CLASS");
   newMessage.classList.add(CSS);

   messageList.appendChild(newMessage);

}

const getHistory = () => {
    console.log("this is client")
    fetch("/messages")
    .then(response => response.json())
    .then(data => {
        const { messages } = data;
        messages.forEach(message =>
            addMessage(`${message.message}`,`${message.creator}` )
        )
    })
}
// message from me
const submitMessage = (event) => {
    event.preventDefault();
    const message = messageInput.value;
    socket.emit("new message sent", {message, creator : nickName});
    messageInput.value = "";
    addMessage(message, nickName);
    messageList.scrollTop = messageList.scrollHeight;
}

const closeChat = () => {
    log()
}

// message from others
socket.on("notification", data => {
    const {message, creator} = data;
    addMessage(`${message}`, `${creator}`);
});

getHistory();

closingChat.addEventListener('click', closeChat);
nicknameForm.addEventListener('submit', setNickname);
messageForm.addEventListener('submit', submitMessage);

