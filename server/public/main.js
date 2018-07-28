const socket = io(),
    nicknameForm = document.querySelector('.js-nickname'),
    nicknameInput = nicknameForm.querySelector('.js-input'),
    messageForm = document.querySelector('.js-message'),
    messageInput = messageForm.querySelector('.js-input'),
    messageList = document.querySelector('.js-messageList');


const NICKNAME = "nickname";

let nickName = localStorage.getItem(NICKNAME);
messageForm.style.display = "none";

const setNickname = event => {
    event.preventDefault();
    const InputValue = nicknameInput.value;
   localStorage.setItem(
       NICKNAME, InputValue);
    // nickName = nick; : 이건 왜 있는거징..
    nicknameForm.style.display = "none";
    messageForm.style.display = "block";
}

const addMessage = message => {
    const messagediv = document.createElement('div');
    const messageContent = document.createTextNode(message);

    messagediv.appendChild(messageContent);
    messageList.appendChild(messagediv);
    
}

const submitMessage = () => {
    event.preventDefault();
    const message = messageInput.value;
    socket.emit("message", message);
    messageInput.value = "";
    addMessage(message);

}

nicknameForm.addEventListener('submit', setNickname);
messageForm.addEventListener('submit', submitMessage);
