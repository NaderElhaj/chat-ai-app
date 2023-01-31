import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

//  loading messages
function loader(element) {
  element.textContent = "";
  loadInterval = setInterval(() => {
    element.textContent += ".";
    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
}

// typing message letter by letter

function typeText(element, text) {
  let index = 0;
  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHtml += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

// generating unique id for each message using the current timestamp

function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);
  return `id-${timestamp}-${hexadecimalString}`;
}

//Ai or User recognition

function chatStripe(isAi, value, uniqueId) {
  return `
      <div class="wrapper ${isAi && "ai"}">
          <div class="chat">
              <div class="profile">
                  <img 
                    src=${isAi ? bot : user} 
                    alt="${isAi ? "bot" : "user"}" 
                  />
              </div>
              <div class="message" id=${uniqueId}>${value}</div>
          </div>
      </div>
  `;
}

const handleSumbit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  //users ChatStripe

  chatContainer.innerHTML += chatStripe(false, data.get("prompt"));
  form.reset();

  //bots ChatStripe
  const uniqueId = generateUniqueId(); 
  chatContainer.innerHTML += chatStripe(true, " ",uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight ; 

  const messageDiv = document.getElementById(uniqueId) ; 

  loader(messageDiv) ; 


};

form.addEventListener('submit',handleSumbit) ; 
form.addEventListener('keyup',(e)=>{
  if(e.keyCode === 13){
    handleSumbit(e)
  }
}) ; 

