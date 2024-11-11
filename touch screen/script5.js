// with timer and jumping gpt code
// best code till now
// get our elements
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
const interval = 6000; // 6 seconds

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

// add touch event listeners
slider.addEventListener('touchstart', touchStart);
slider.addEventListener('touchmove', touchMove);
slider.addEventListener('touchend', touchEnd);

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
