let word = ['D', 'A', 'N', 'D', 'Y'];   // The solution to the Wordle

let currentGuess = [];
let currentRow = 1;

function writeLetter(letter) {
    /* Each letter key in the HTML page passes itself as a value to this function */
    if (currentRow <= 6) {
        // If there are still blank guesses remaining
        if (currentGuess.length != 5) {
            // If user has not guessed up to five letters

            currentGuess.push(letter);
            letterIndex = currentGuess.length;
            squareID = "boardrow" + currentRow + "square" + letterIndex;    // Construct the square ID
            document.getElementById(squareID).innerHTML = letter;
        }
    }
}

function deleteLetter() {
    if (currentGuess.length > 0) {
        // If there are any letters to delete

        letterIndex = currentGuess.length;
        currentGuess.pop(); n
        squareID = "boardrow" + currentRow + "square" + letterIndex;
        document.getElementById(squareID).innerHTML = "";
    }
}
function submitGuess() {
    if (currentGuess.length == 5) {
        // Checks if the user has guessed a full word
        for (let i=1; i < 6; i++) {
            // Iterates over all the squares in a guess row
            squareID = "boardrow" + currentRow + "square" + i;
            squareValue = document.getElementById(squareID).innerHTML;
            if (squareValue == word[i-1]) {
                // Checks if the value of the square matches the value's index in the word
                document.getElementById(squareID).setAttribute("class", "square correct");
            } else if (word.includes(squareValue)) {
                // Misplaced letter
                document.getElementById(squareID).setAttribute("class", "square misplaced");
            } else {
                document.getElementById(squareID).setAttribute("class", "square guessed");
            }
        }
        currentRow++;   // Begins guessing the next row
        currentGuess = [];
    }
}