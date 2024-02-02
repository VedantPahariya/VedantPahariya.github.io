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