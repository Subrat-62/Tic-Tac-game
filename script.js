const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
let board = ["", "", "", "", "", "", "", "", ""];
let isPlayerTurn = true;
let gameActive = true;

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8], // Rows
  [0,3,6], [1,4,7], [2,5,8], // Columns
  [0,4,8], [2,4,6]           // Diagonals
];

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = cell.getAttribute("data-index");
    if (board[index] === "" && isPlayerTurn && gameActive) {
      makeMove(index, "X");
      isPlayerTurn = false;
      if (checkWinner("X")) return;
      setTimeout(computerMove, 500);
    }
  });
});

function makeMove(index, symbol) {
  board[index] = symbol;
  cells[index].textContent = symbol;
}

function computerMove() {
  if (!gameActive) return;

  let emptyIndices = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
  if (emptyIndices.length === 0) return;

  let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(randomIndex, "O");

  if (checkWinner("O")) return;
  isPlayerTurn = true;
  statusText.textContent = "Your turn!";
}

function checkWinner(symbol) {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] === symbol && board[b] === symbol && board[c] === symbol) {
      gameActive = false;
      statusText.textContent = symbol === "X" ? "You win!" : "Computer wins!";
      highlightWinningCells(condition);
      return true;
    }
  }

  if (!board.includes("")) {
    gameActive = false;
    statusText.textContent = "It's a draw!";
    return true;
  }

  return false;
}

function highlightWinningCells(indices) {
  indices.forEach(i => {
    cells[i].style.backgroundColor = "#8ef58e";
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.backgroundColor = "white";
  });
  gameActive = true;
  isPlayerTurn = true;
  statusText.textContent = "Your turn!";
}