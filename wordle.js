let word = ['E', 'A', 'R', 'T', 'H'];

let currentGuess = [];
let currentRow = 1;

let board = document.getElementsByClassName("board");

function writeLetter(letter) {
    if (currentGuess.length != 5) {
        currentGuess.push(letter);
        letterIndex = currentGuess.length;
        squareID = "boardrow" + currentRow + "square" + letterIndex;
        document.getElementById(squareID).innerHTML = letter;
    }
}

function deleteLetter() {
    if (currentGuess.length > 0) {
        letterIndex = currentGuess.length;
        currentGuess.pop();
        squareID = "boardrow" + currentRow + "square" + letterIndex;
        document.getElementById(squareID).innerHTML = "";
    }
}
function submitGuess() {
    if (currentGuess.length == 5) {
        for (let i=1; i < 6; i++) {
            squareID = "boardrow" + currentRow + "square" + i;
            squareValue = document.getElementById(squareID).innerHTML;
            if (squareValue == word[i-1]) {
                document.getElementById(squareID).setAttribute("class", "square correct");
            } else if (word.includes(squareValue)) {
                document.getElementById(squareID).setAttribute("class", "square misplaced");
            }
        }
        currentRow++;
        currentGuess = [];
    }
}