var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

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
                resetButton.textContent = "Play Again?"
                h1.style.backgroundColor = clickedColor;
            } else {
                this.style.backgroundColor = "#232323"
                messageDisplay.textContent = "Try Again!";
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