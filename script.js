// Starting Animation
document.addEventListener('DOMContentLoaded', function() {
  const image = document.querySelector('.animated-image');
  setTimeout(function() {
        image.classList.add('animatze'); // Add the class to start the animation
      }, 2000); 
//   image.style.animation = 'image-animation 2s ease-in-out forwards';
  setTimeout(function() {
    content.style.opacity = '1'; // Show the content gradually after animation ends
  }, 3400); // Delay the content display for the same duration as the animation
});
// Animation ends here

const changingTexts = ["all your tech needs!", "your Laptops", "your PCs"];
let textIndex = 0;
let charIndex = 0;

function typeChangingText() {
  const changingTextElement = document.getElementById('changingText');
  changingTextElement.textContent += changingTexts[textIndex][charIndex];
  charIndex++;

  if (charIndex === changingTexts[textIndex].length) {
    clearInterval(changingTextInterval);
    setTimeout(resetTyping, 1000);
  }
}

function resetTyping() {
  const changingTextElement = document.getElementById('changingText');
  changingTextElement.style.opacity = 0;

  charIndex = 0;
  textIndex = (textIndex + 1) % changingTexts.length;

  setTimeout(() => {
    changingTextElement.textContent = '';
    changingTextElement.style.opacity = 1;
    changingTextInterval = setInterval(typeChangingText, 100);
  }, 500);
}

let changingTextInterval = setInterval(typeChangingText, 100);

document.addEventListener('DOMContentLoaded', () => {
  const cursorElement = document.getElementById('cursor');
  cursorElement.style.display = 'inline-block';
});

// Chatbot
window.botpressWebChat.init({
  "composerPlaceholder": "Chat with Pahariya Computers",
  "botConversationDescription": "",
  "botId": "dc4ff08d-3e8a-4c8e-86d8-0025d62aa89f",
  "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
  "messagingUrl": "https://messaging.botpress.cloud",
  "clientId": "dc4ff08d-3e8a-4c8e-86d8-0025d62aa89f",
  "webhookId": "aa70629f-8ea6-4b1c-a102-53b874648089",
  "lazySocket": true,
  "themeName": "prism",
  "frontendVersion": "v1",
  "showPoweredBy": true,
  "theme": "prism",
  "themeColor": "#dd0404",
  "botName": "Pahariya Computers",
  // "layoutWidth": "10px",
  // "containerWidth": "700px",
  "botConversationDescription": "Let's kick off our conversation with a warm hello!",
  // "avatarUrl": "Images/logo.png",
  "useSessionStorage": true,   // to not store the chat history after the session ends on closing the tab
  "enablePersistHistory": false,
  // "website": true,
});
// Chatbot ends here