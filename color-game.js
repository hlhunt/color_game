var numSquares = 6;
var colors = [];
var pickedColor;
var playerMode = true; // True is equivalent to player one's turn
var playerOneScore = 0;
var playerTwoScore = 0;
var winningScore = 30;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var oneScore = document.querySelector("#playerOne");
var twoScore = document.querySelector("#playerTwo");
var playerOneDisplay = document.querySelector("#playerOneDisplay");
var playerTwoDisplay = document.querySelector("#playerTwoDisplay");
var nextPlayerButton = document.querySelector("#nextPlayer");
var overlayWinner = document.querySelector("#overlayWinner");
var resetGameButton = document.querySelector("#resetGame");

init();

function init() {
    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons() {
    // mode buttons event listeners
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            reset();
        });
    }
}

function setupSquares() {
    for (var i = 0; i < squares.length; i++) {
        // add click listeners to squares
        squares[i].addEventListener("click", function() {
            // grab color of picked square
            clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!"
                changeColors(clickedColor);
                // resetButton.textContent = "Play Again?"
                h1.style.backgroundColor = clickedColor;
                if (playerMode) {
                    playerOneScore += 10;
                    oneScore.textContent = playerOneScore;
                    gameWon(playerOneScore);
                } else {
                    playerTwoScore += 10;
                    twoScore.textContent = playerTwoScore;
                    gameWon(playerTwoScore);
                }
                nextPlayerButton.style.display = "block";
            } else {
                this.style.backgroundColor = "#232323"
                messageDisplay.textContent = "Try Again!";
                if (playerMode) {
                    playerOneScore -= 5;
                    oneScore.textContent = playerOneScore;
                } else {
                    playerTwoScore -= 5;
                    twoScore.textContent = playerTwoScore;
                }
            }
        });
    }
} 

function reset() {
    // generate all new colors
    colors = generateRandomColors(numSquares);
    // pick a new random color from array
    pickedColor = pickColor();
    // change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    // change colors of squares
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
        
    }
    // change h1 background to default
    h1.style.backgroundColor = "steelblue";

    messageDisplay.textContent = "";
    resetButton.textContent = "New Colors";
}

resetButton.addEventListener("click", function() {
    reset();
});

nextPlayerButton.addEventListener("click", function() {
    changePlayer();
    nextPlayerButton.style.display = "none";
});

// Change squares to winning color
function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.background = color
    }
}

// pick a random color to be the winning color
function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return(colors[random]);
}

function generateRandomColors(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        // get a random color and push into array
        arr.push(randomColor());
    }

    return arr;
}

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")"
}

function changePlayer() {
    playerTwoDisplay.classList.toggle("turn");
    playerOneDisplay.classList.toggle("turn");
    playerMode = !playerMode;
    reset();
}

function gameWon(score) {
    if (score >= winningScore) {
        playerOneScore = 0;
        playerTwoScore = 0;
        oneScore.textContent = playerOneScore;
        twoScore.textContent = playerTwoScore;
    }
}