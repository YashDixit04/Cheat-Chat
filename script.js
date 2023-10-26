
const sendChatBtn = document.querySelector(".chat-input span");
const chatInput = document.querySelector(".chat-input textarea");
const chatbox = document.querySelector(".chatbox");

let userMessage;
// OPEN_AI API KEY 
const API_KEY = "";

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : ` <span class="material-symbols-outlined">robot_2</span><p>${message}</p>`
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = () => {
    const API_URL = "https://api.openai.com/v1/chat/completions";

    const requestOptions = {
        method: "POST",
        header: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        // NOT Find 
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            message: [{ role: "user", content: userMessage }],
            "temperature": 0.7,
        })
    }
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        console.log(data);
    }).catch((err) => {
        console.log(err);
    })
}


const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;


    chatbox.appendChild(createChatLi(userMessage, "outgoing"));

    setTimeout(() => {
        chatbox.appendChild(createChatLi("Thinking....", "incoming"));
        generateResponse();
    }, 600)
}

sendChatBtn.addEventListener("click", handleChat);
