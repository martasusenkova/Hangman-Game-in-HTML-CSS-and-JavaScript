const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
let currentWord,
  wrongGuessCount = 0;
const maxGuesses = 6;

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  console.log(word, hint);
  document.querySelector(".hint-text b").innerHTML = hint;
  wordDisplay.innerHTML = word
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
};

const initGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        const liElements = wordDisplay.querySelectorAll("li");
        liElements[index].innerHTML = letter;
        liElements[index].classList.add("guessed");
      }
    });
  } else {
    // if clicked letter is wrog, update the image
    wrongGuessCount++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  }

  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
};

// Создаём кнопки A-Z
for (let i = 97; i <= 122; i++) {
  const letter = String.fromCharCode(i);
  const button = document.createElement("button");
  button.innerText = letter;
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) => initGame(e.target, letter));
}

getRandomWord();
