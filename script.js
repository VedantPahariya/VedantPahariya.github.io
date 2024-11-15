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
  "botConversationDescription": "Let's kick off our conversation with a warm hello!",
  "botId": "dc4ff08d-3e8a-4c8e-86d8-0025d62aa89f",
  "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
  "messagingUrl": "https://messaging.botpress.cloud",
  "clientId": "dc4ff08d-3e8a-4c8e-86d8-0025d62aa89f",
  "webhookId": "aa70629f-8ea6-4b1c-a102-53b874648089",
  "lazySocket": true,
  "stylesheet": "https://webchat-styler-css.botpress.app/prod/code/70721ca7-c863-4239-9850-7d7986492934/v47941/style.css",
  "themeName": "prism",
  "frontendVersion": "v1",
  "theme": "prism",
  "themeColor": "#dd0404",
  "botName": "Pahariya Computers",
  // "layoutWidth": "10px",
  // "containerWidth": "700px",
  // "avatarUrl": "Images/logo.png",
  // "coverPictureUrl": "Images/logo.png",
  // "website": false, 
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

// Add event listeners for both dragging and touch events
slider.addEventListener('mousedown', pointerDown);
slider.addEventListener('mousemove', pointerMove);
slider.addEventListener('mouseup', pointerUp);
slider.addEventListener('mouseleave', pointerUp);

slider.addEventListener('touchstart', touchStart);
slider.addEventListener('touchmove', touchMove);
slider.addEventListener('touchend', touchEnd);

function pointerDown(event) {
  startPos = event.clientX;
  isDragging = true;
  animationID = requestAnimationFrame(animation);
  slider.classList.add('grabbing');
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
  handleSlideChange(movedBy);
  slider.classList.remove('grabbing');
}

function touchStart(event) {
  startPos = event.touches[0].clientX;
  isDragging = true;
  animationID = requestAnimationFrame(animation);
  slider.classList.add('grabbing');
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = event.touches[0].clientX;
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function touchEnd() {
  cancelAnimationFrame(animationID);
  isDragging = false;
  const movedBy = currentTranslate - prevTranslate;
  handleSlideChange(movedBy);
  slider.classList.remove('grabbing');
}

function handleSlideChange(movedBy) {
  // Calculate the width of a single slide
  const slideWidth = slides[0].offsetWidth;

  // If moved enough negative, move to the next slide if there is one,
  // otherwise, loop back to the duplicated first slide
  if (movedBy < -100 && currentIndex < slides.length - 1) {
    currentIndex += 1;
  } else if (movedBy < -100 && currentIndex === slides.length - 1) {
    currentIndex = 0;
    resetSliderOpacity();
  }

  // If moved enough positive, move to the previous slide if there is one,
  // otherwise, loop back to the last slide
  if (movedBy > 100 && currentIndex > 0) {
    currentIndex -= 1;
  } else if (movedBy > 100 && currentIndex === 0) {
    currentIndex = slides.length - 1;
    resetSliderOpacity();
  }

  // Set the current translate position based on the currentIndex
  currentTranslate = -currentIndex * slideWidth;
  prevTranslate = currentTranslate;

  // Apply the new translation
  setSliderPosition();
}

function resetSliderOpacity() {
  slider.style.opacity = 0; // Hide the slider
  setTimeout(() => {
    // Reset currentIndex and show the slider again
    slider.style.opacity = 1; // Show the slider
  }, 250); // Delay before resetting to the first slide
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

// Slide-Show Ends here


// Product Showcase 

document.addEventListener('DOMContentLoaded', function () {
  const products = [
      {
          name: 'Hindware Snowcrest Arctic 90L Desert Air Cooler',
          price: '$19.99',
          image: 'Images/Products/HindArc90.png',
          warranty: '1 Year',
          description: 'This is a great product that you will love!'
      },
      {
          name: 'Product 2',
          price: '$29.99',
          image: 'https://via.placeholder.com/200',
          warranty: '2 Years',
          description: 'This product is even better and offers more features.'
      },
      {
          name: 'Product 3',
          price: '$39.99',
          image: 'https://via.placeholder.com/200',
          warranty: '1 Year',
          description: 'A reliable and affordable product for everyday use.'
      },
      {
          name: 'Product 4',
          price: '$49.99',
          image: 'https://via.placeholder.com/200',
          warranty: '3 Years',
          description: 'Top quality product with exceptional durability.'
      },
      {
          name: 'Product 5',
          price: '$59.99',
          image: 'https://via.placeholder.com/200',
          warranty: '2 Years',
          description: 'A premium product with top-notch features.'
      },
      {
          name: 'Product 6',
          price: '$69.99',
          image: 'https://via.placeholder.com/200',
          warranty: '1 Year',
          description: 'Our best-selling product with great reviews.'
      }
  ];

  const productGrid = document.getElementById('product-grid');
  const modal = document.getElementById('product-modal');
  const closeButton = document.getElementById('close-button');
  const modalImage = document.getElementById('modal-image');
  const modalName = document.getElementById('modal-name');
  const modalPrice = document.getElementById('modal-price');
  const modalWarranty = document.getElementById('modal-warranty');
  const modalDescription = document.getElementById('modal-description');

  products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      
      const discountPercentage = ((product.originalPrice - product.price) / product.originalPrice) * 100;
      
      productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <div class="product-details">
              <div class="product-name">${product.name}</div>
              

          </div>
      `;
      // <div class="product-price">${product.price}</div> 
// add above line after product.name above to show the price
  
      productCard.addEventListener('click', () => {
          modalImage.src = product.image;
          modalName.textContent = product.name;
          // modalPrice.textContent = `Price: ${product.price}`;
          modalWarranty.textContent = `Warranty: ${product.warranty}`;
          modalDescription.textContent = `Description: ${product.description}`;
          modal.style.display = 'block';
      });

      productGrid.appendChild(productCard);
  });

  closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  });
});

// Product Showcase Ends here

// Development Notice
// Development Notice
document.addEventListener('DOMContentLoaded', function() {
  const devNotice = document.getElementById('devNotice');
  let hasShown = false;
  
  // Initially hide the toast
  devNotice.style.display = 'none';

  // Handle close button click
  document.querySelector('.toast-close').addEventListener('click', function() {
      devNotice.style.animation = 'slideOut 0.5s ease-out';
      setTimeout(() => {
          devNotice.style.display = 'none';
      }, 500);
  });

  // Throttled scroll handler
  let ticking = false;
  
  window.addEventListener('scroll', function() {
      if (!ticking && !hasShown) {
          window.requestAnimationFrame(function() {
              const windowHeight = window.innerHeight;
              const documentHeight = document.documentElement.scrollHeight;
              const scrollPosition = window.scrollY;
              
              // Show notice when user is near bottom (within 100px)
              if ((windowHeight + scrollPosition) >= (documentHeight - 100)) {
                  devNotice.style.display = 'flex';
                  devNotice.style.animation = 'slideIn 0.5s ease-out';
                  hasShown = true;
              }
              
              ticking = false;
          });
          
          ticking = true;
      }
  });
});