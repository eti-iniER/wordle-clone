let possible_words = data;
let word_index = Math.floor(Math.random() * (possible_words.length + 1));
let entire_word = possible_words[word_index];
let word = Array.from(entire_word);
let userHasGuessedCorrectly = false;
LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

window.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    submitGuess();
  }
  if (event.key == "Backspace") {
    deleteLetter();
  }
  if (LETTERS.includes(event.key.toUpperCase())) {
    writeLetter(event.key.toUpperCase());
  }
});

let currentGuess = [];
let currentRow = 1;
let flipDelay = 0;

async function getDefinition(enteredWord) {
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${enteredWord}`;
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    return {};
  }
}

async function validateWord(enteredWord) {
  const wordDefinition = await getDefinition(enteredWord);
  if (wordDefinition[0] && wordDefinition[0].hasOwnProperty("word")) {
    return true;
  }
  return false;
}

function writeLetter(letter) {
  /* Each letter key in the HTML page passes itself as a value to this function */
  if (currentRow < 7) {
    if (userHasGuessedCorrectly == true) {
      return;
    }
    // If there are still blank guesses remaining
    if (currentGuess.length < 5) {
      // If user has not guessed up to five letters

      currentGuess.push(letter);
      letterIndex = currentGuess.length;
      squareID = "boardrow" + currentRow + "square" + letterIndex; // Construct the square ID
      document.getElementById(squareID).innerHTML = letter;
    }
  }
}

function deleteLetter() {
  if (currentGuess.length > 0) {
    // If there are any letters to delete

    letterIndex = currentGuess.length;
    currentGuess.pop();
    squareID = "boardrow" + currentRow + "square" + letterIndex;
    document.getElementById(squareID).innerHTML = "";
  }
}
async function submitGuess() {
  let flipDelay = 0;
  let to_be_animated = [];
  if (userHasGuessedCorrectly == true) {
    // Checks if the game has already been won
    return;
  }
  if (currentGuess.length == 5) {
    // Checks if the user has guessed a full word
    let guessedWord = "";
    for (letter of currentGuess) {
      // Helper loop to form guess array into strings
      guessedWord += letter;
    }

    // API shenanigans!!
    let valid = await validateWord(guessedWord);
    // ===============

    if (!valid) {
      showAlert("alert-fake-word", "alert-fake-word-text", "Not a word!");
      return;
    }
    
    // CODE to only register each letter the number of times it occurs
    letter_freq = {}
    well_placed = {}
    for (let char of word) {
      if (letter_freq.hasOwnProperty(char)) {
        letter_freq[char]++;
      } else {
        letter_freq[char] = 1;
        well_placed[char] = false;
      }
    }

    for (let i = 0; i < guessedWord.length; i++) {
      if (guessedWord[i] == word[i]) {
        well_placed[word[i]] = true;
      }
    };

    for (let i = 1; i < 6; i++) {
      // Iterates over all the squares in a guess row
      squareID = "boardrow" + currentRow + "square" + i;
      squareValue = document.getElementById(squareID).innerHTML;

      if (squareValue == word[i - 1]) {
        // Checks if the value of the square matches the value's index in the word
        to_be_animated.push({
          id: squareID,
          delay: flipDelay,
          newClass: "square correct",
        });
        letter_freq[squareValue] --;
      } else if (word.includes(squareValue) && letter_freq[squareValue] > 0 && well_placed[squareValue] != true) {
        // Misplaced letter
        to_be_animated.push({
          id: squareID,
          delay: flipDelay,
          newClass: "square misplaced",
        });
        letter_freq[squareValue]--;
      } else {
        to_be_animated.push({
          id: squareID,
          delay: flipDelay,
          newClass: "square guessed",
        });
      }
      flipDelay += 300;
    }

    for (let i = 0; i < to_be_animated.length; i++) {
      let element = to_be_animated[i];
      setTimeout(() => {
        animateLetter(element["id"], element["delay"], element["newClass"]);
        i++;
        if (element["newClass"] == "square guessed") {
          squareValue = document.getElementById(element["id"]).innerHTML;
          document
            .getElementById(squareValue)
            .setAttribute("class", "key faded");
        }
      }, element["delay"]);
    }

    currentRow++; // Begins guessing the next row
    if (currentGuess.toString() == word.toString()) {
      // Check if player has won the game
      userHasGuessedCorrectly = true;
      endGame();
      return;
    }
    currentGuess = [];
    if (currentRow == 7) {
      if (userHasGuessedCorrectly == false) {
        setTimeout(() => {
          showAlert("alert-answer", "alert-answer-text", entire_word);
        }, 1500);
      }
      endGame();
      return;
    }
  }
}

function showAlert(alertID, alertTextID, alertMessage) {
  message = document.getElementById(alertID);
  messageText = document.getElementById(alertTextID);
  messageText.innerHTML = alertMessage;
  message.style.display = "flex";
  message.style.animationName = "slide-down";
  setInterval(() => {
    message.style.animationName = "slide-up";
  }, 1500);
  setInterval(() => {
    message.style.display = "none";
  }, 2000);
}

function animateLetter(squareID, delay, newClass) {
  square = document.getElementById(squareID);
  square.style.animationName = "flip";
  square.setAttribute("class", newClass);
}

function endGame() {
  if (userHasGuessedCorrectly) {
    banner = document.getElementById("victory-banner");
  } else {
    banner = document.getElementById("defeat-banner");
  }
  setTimeout(() => {
    banner.style.display = "block";
  }, flipDelay + 1000);
}

function closeBanner() {
  banner = document.getElementsByClassName("banner");
  for (b of banner) {
    b.style.display = "none";
  }
}
