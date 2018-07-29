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

    nickName = nicknameInput.value;
    nicknameForm.style.display = "none";
    messageForm.style.display = "block";
}

const addMessage = (message, creator) => {
    console.log(message, creator);

    const messageCreator = document.createElement("div");
    messageCreator.innerHTML = creator;
    messageCreator.classList.add("message__creator");
    const messageContent = document.createTextNode(message);

    const messageContatiner = document.createElement('div');

    messageContatiner.appendChild(messageCreator);
    messageContatiner.appendChild(messageContent);
    messageContatiner.classList.add('message__container');

    messageList.appendChild(messageContatiner);

    
}

const submitMessage = (event) => {
    event.preventDefault();
    const message = messageInput.value;
    socket.emit("message", {text: message, creator: nickName});
    messageInput.value = "";
    addMessage(message, nickName);

}

socket.on("new message", data => {
    addMessage(data.text, data.creator);
});

nicknameForm.addEventListener('submit', setNickname);
messageForm.addEventListener('submit', submitMessage);
