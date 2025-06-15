const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainButton = document.querySelector(".play-again");
let currentWord, wrongGuessCount, correctLetters;
const maxGuesses = 6;

//reseting all the game variables and UI elements
const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  keyboardDiv
    .querySelectorAll("button")
    .forEach((button) => (button.disabled = false));
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  gameModal.classList.remove("show");
};

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  document.querySelector(".hint-text b").innerHTML = hint;
  resetGame();
};

const initGame = (button, clickedLetter) => {
  //checking if the clicked button is in the world
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        const liElements = wordDisplay.querySelectorAll("li");
        liElements[index].innerHTML = letter;
        liElements[index].classList.add("guessed");
      }
    });
  } else {
    // if clicked letter is wrong, update the image
    wrongGuessCount++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  //caling gameOver function if any of these conditions meet
  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

// Создаём кнопки A-Z
for (let i = 97; i <= 122; i++) {
  const letter = String.fromCharCode(i);
  const button = document.createElement("button");
  button.innerText = letter;
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) => initGame(e.target, letter));
}

const gameOver = (isVictory) => {
  setTimeout(() => {
    gameModal.classList.add("show");
    const modalText = isVictory
      ? `You found the word:`
      : `The correct word was`;
    gameModal.querySelector("img").src = `images/${
      isVictory ? "victory" : "lost"
    }.gif`;
    gameModal.querySelector("h4").innerText = `${
      isVictory ? "Congrats!" : "You lost"
    }`;
    gameModal.querySelector(
      "p"
    ).innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
  }, 300);
};

getRandomWord();

playAgainButton.addEventListener("click", getRandomWord);
