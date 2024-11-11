// jumping gpt code
// get our elements
const slider = document.querySelector('.slider-container'),
  slides = Array.from(document.querySelectorAll('.slide'))

// set up our state
let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID,
  currentIndex = 0

// add our event listeners
slides.forEach((slide, index) => {
  const slideImage = slide.querySelector('img')
  // disable default image drag
  slideImage.addEventListener('dragstart', (e) => e.preventDefault())
  // pointer events
  slide.addEventListener('pointerdown', pointerDown(index))
  slide.addEventListener('pointerup', pointerUp)
  slide.addEventListener('pointerleave', pointerUp)
  slide.addEventListener('pointermove', pointerMove)
})

// make responsive to viewport changes
window.addEventListener('resize', setPositionByIndex)

// prevent menu popup on long press
window.oncontextmenu = function (event) {
  event.preventDefault()
  event.stopPropagation()
  return false
}

// use a HOF so we have index in a closure
function pointerDown(index) {
  return function (event) {
    currentIndex = index
    startPos = event.clientX
    isDragging = true
    animationID = requestAnimationFrame(animation)
    slider.classList.add('grabbing')
  }
}

function pointerMove(event) {
  if (isDragging) {
    const currentPosition = event.clientX
    currentTranslate = prevTranslate + currentPosition - startPos
  }
}

function pointerUp() {
  cancelAnimationFrame(animationID)
  isDragging = false
  const movedBy = currentTranslate - prevTranslate

  // if moved enough negative then move to the next slide if there is one
  if (movedBy < -100 && currentIndex < slides.length - 1) {
    currentIndex += 1
  } else if (movedBy < -100 && currentIndex === slides.length - 1) {
    currentIndex = 0; // If on last slide, move to the first slide
  }

  // if moved enough positive then move to the previous slide if there is one
  if (movedBy > 100 && currentIndex > 0) {
    currentIndex -= 1
  } else if (movedBy > 100 && currentIndex === 0) {
    currentIndex = slides.length - 1; // If on first slide, move to the last slide
  }

  setPositionByIndex()

  slider.classList.remove('grabbing')
}

function animation() {
  setSliderPosition()
  if (isDragging) requestAnimationFrame(animation)
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth
  prevTranslate = currentTranslate
  setSliderPosition()
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`
}
