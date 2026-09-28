const form = document.getElementById("player-form");

const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");

const restartButton = document.getElementById("restart-btn");

const player1Display = document.getElementById("player1-display");
const player2Display = document.getElementById("player2-display");

const scoreXDisplay = document.getElementById("score-x");
const scoreODisplay = document.getElementById("score-o");

let board = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let gameActive = false;

let player1 = "Player X";
let player2 = "Player O";

let scores = {
    X: 0,
    O: 0
};


// Winning combinations

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];


// Load scores from Local Storage

function loadScores() {

    const savedScores = localStorage.getItem("ticTacToeScores");

    if (savedScores) {
        scores = JSON.parse(savedScores);
    }

    updateScoreboard();
}


// Save scores

function saveScores() {

    localStorage.setItem(
        "ticTacToeScores",
        JSON.stringify(scores)
    );
}


// Start game

form.addEventListener("submit", function(event) {

    event.preventDefault();

    player1 = document.getElementById("player1").value.trim();
    player2 = document.getElementById("player2").value.trim();

    currentPlayer =
        document.getElementById("starting-player").value;

    if (player1 === "" || player2 === "") {
        alert("Please enter both player names.");
        return;
    }

    player1Display.textContent = player1;
    player2Display.textContent = player2;

    gameActive = true;

    resetBoard();

    updateStatus();
});


// Cell click event

cells.forEach(function(cell) {

    cell.addEventListener("click", function() {

        const index = Number(cell.dataset.index);

        if (!gameActive) {
            return;
        }

        if (board[index] !== "") {
            return;
        }

        board[index] = currentPlayer;

        cell.textContent = currentPlayer;

        checkGameResult();
    });
});


// Check game result

function checkGameResult() {

    if (checkWinner()) {

        const winner =
            currentPlayer === "X" ? player1 : player2;

        statusText.textContent =
            `${winner} (${currentPlayer}) wins!`;

        scores[currentPlayer]++;

        saveScores();

        updateScoreboard();

        gameActive = false;

        return;
    }


    if (checkDraw()) {

        statusText.textContent = "Game Draw!";

        gameActive = false;

        return;
    }


    switchPlayer();

    updateStatus();
}


// Check winner

function checkWinner() {

    return winningCombinations.some(function(combination) {

        const [a, b, c] = combination;

        return (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        );

    });
}


// Check draw

function checkDraw() {

    return board.every(function(cell) {

        return cell !== "";

    });
}


// Change player

function switchPlayer() {

    currentPlayer =
        currentPlayer === "X" ? "O" : "X";
}


// Update status

function updateStatus() {

    const currentName =
        currentPlayer === "X" ? player1 : player2;

    statusText.textContent =
        `${currentName}'s turn (${currentPlayer})`;
}


// Restart game

restartButton.addEventListener("click", function() {

    resetBoard();

    gameActive = true;

    updateStatus();
});


// Reset board

function resetBoard() {

    board = ["", "", "", "", "", "", "", "", ""];

    cells.forEach(function(cell) {

        cell.textContent = "";

    });
}


// Update scoreboard

function updateScoreboard() {

    scoreXDisplay.textContent = scores.X;
    scoreODisplay.textContent = scores.O;
}


// Load saved scoreboard

loadScores();