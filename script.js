// Starting Animation
document.addEventListener('DOMContentLoaded', function() {
  const image = document.querySelector('.animated-image');
  setTimeout(function() {
        image.classList.add('animatze'); // Add the class to start the animation
      }, 2000); 
//   image.style.animation = 'image-animation 2s ease-in-out forwards';
  setTimeout(function() {
    content.style.opacity = '1'; // Show the content gradually after animation ends
  }, 3800); // Delay the content display for the same duration as the animation
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

// Slide-Show
const slider = document.querySelector('.slider-container'),
  slides = Array.from(document.querySelectorAll('.slide'));

// Duplicate the first slide and append it to the end
const firstSlideClone = slides[0].cloneNode(true);
const lastSlideClone = slides[slides.length - 1].cloneNode(true);
// slider.insertBefore(lastSlideClone, slider.firstChild);
slider.appendChild(firstSlideClone);

// set up our state
let isDragging = false,
  startPos = 0,
  currentTranslate = 0, 
  prevTranslate = 0,
  animationID,
  currentIndex = 0;

// Interval between slide transitions in milliseconds
const interval = 10000; // 6 seconds

// Start the continuous slideshow
startSlideshow();

// Function to start the continuous slideshow
function startSlideshow() {
  setInterval(() => {
    goToNextSlide();
  }, interval);
}

// Function to advance to the next slide
function goToNextSlide() {
   // If currentIndex is at the last slide, reset to the first slide
   if (currentIndex === slides.length - 1) {
    currentIndex = 0;
    slider.style.opacity = 0; // Hide the slider
    setTimeout(() => {
      // Reset currentIndex and show the slider again
      slider.style.opacity = 1; // Show the slider
    }, 250); // Delay before resetting to the first slide
  } else {
    currentIndex++;
  }

  // Update translation based on currentIndex
  currentTranslate = -currentIndex * slides[0].offsetWidth;
  prevTranslate = currentTranslate;

  // Apply the new translation
  setSliderPosition();
}

// add our event listeners
slides.forEach((slide, index) => {
  const slideImage = slide.querySelector('img');
  // disable default image drag
  slideImage.addEventListener('dragstart', (e) => e.preventDefault());
  // pointer events
  slide.addEventListener('pointerdown', pointerDown(index));
  slide.addEventListener('pointerup', pointerUp);
  slide.addEventListener('pointerleave', pointerUp);
  slide.addEventListener('pointermove', pointerMove);
});

// make responsive to viewport changes
window.addEventListener('resize', setPositionByIndex);

// prevent menu popup on long press
window.oncontextmenu = function (event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

// use a HOF so we have index in a closure
function pointerDown(index) {
  return function (event) {
    currentIndex = index;
    startPos = event.clientX;
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    slider.classList.add('grabbing');
  };
}

function pointerMove(event) {
  if (isDragging) {
    const currentPosition = event.clientX;
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function pointerUp() {
  cancelAnimationFrame(animationID);
  isDragging = false;
  const movedBy = currentTranslate - prevTranslate;

  // Calculate the width of a single slide
  const slideWidth = slides[0].offsetWidth;

  // If moved enough negative, move to the next slide if there is one,
  // otherwise, loop back to the duplicated first slide
  if (movedBy < -100 && currentIndex < slides.length - 1) {
    currentIndex += 1;
  } else if (movedBy < -100 && currentIndex === slides.length - 1) {
    currentIndex = 0;
    slider.style.opacity = 0; // Hide the slider
    setTimeout(() => {
      // Reset currentIndex and show the slider again
      slider.style.opacity = 1; // Show the slider
    }, 250); // Delay before resetting to the first slide
  }

  // If moved enough positive, move to the previous slide if there is one,
  // otherwise, loop back to the last slide
  if (movedBy > 100 && currentIndex > 0) {
    currentIndex -= 1;
  } else if (movedBy > 100 && currentIndex === 0) {
    currentIndex = slides.length - 1;
    slider.style.opacity = 0; // Hide the slider
    setTimeout(() => {
      // Reset currentIndex and show the slider again
      slider.style.opacity = 1; // Show the slider
    }, 250); // Delay before resetting to the first slide
  }

  // Set the current translate position based on the currentIndex
  currentTranslate = -currentIndex * slideWidth;
  prevTranslate = currentTranslate;

  // Apply the new translation
  setSliderPosition();

  slider.classList.remove('grabbing');
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -slides[0].offsetWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}
// Slide-Show Ends here
