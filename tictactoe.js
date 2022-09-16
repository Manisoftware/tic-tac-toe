var board;
var playerO = "O";
var playerX = "X";
var currPlayer = playerO;
var gameover = false;
window.onload = function () {
  gameover = false;
  setGame();
};
function setGame() {
  board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      if (r == 0 || r == 1) {
        tile.classList.add("horizontal-line");
      }
      if (c == 0 || c == 1) {
        tile.classList.add("vertical-line");
      }
      tile.innerText = "";
      tile.addEventListener("click", setTile);
      document.getElementById("board").appendChild(tile);
    }
  }
}

function setTile() {
  if (gameover) {
    return;
  }
  let coords = this.id.split("-");
  let x = parseInt(coords[0]);
  let y = parseInt(coords[1]);
  if (board[x][y] != " ") {
    // already taken
    return;
  }
  board[x][y] = currPlayer;
  this.innerText = currPlayer;
  if (currPlayer == playerO) {
    currPlayer = playerX;
  } else {
    currPlayer = playerO;
  }
  checkWinner();
}

function checkWinner() {
  // horizontal check in three rows
  for (let r = 0; r < 3; r++) {
    if (
      board[r][0] == board[r][1] &&
      board[r][1] == board[r][2] &&
      board[r][2] != " "
    ) {
      for (let i = 0; i < 3; i++) {
        let tile = document.getElementById(r.toString() + "-" + i.toString());
        tile.classList.add("winner");
      }
      gameover = true;
      return;
    }
  }
  // vertical check in three columns
  for (let c = 0; c < 3; c++) {
    if (
      board[0][c] == board[1][c] &&
      board[1][c] == board[2][c] &&
      board[2][c] != " "
    ) {
      for (let i = 0; i < 3; i++) {
        let tile = document.getElementById(i.toString() + "-" + c.toString());
        tile.classList.add("winner");
      }
      gameover = true;
      return;
    }
  }
  //diagonals
  if (
    board[0][0] == board[1][1] &&
    board[1][1] == board[2][2] &&
    board[2][2] != " "
  ) {
    for (let i = 0; i < 3; i++) {
      let tile = document.getElementById(i.toString() + "-" + i.toString());
      tile.classList.add("winner");
    }
    gameover = true;
    return;
  }

  if (
    board[0][2] == board[1][1] &&
    board[1][1] == board[2][0] &&
    board[2][0] != " "
  ) {
    for (let i = 0; i < 3; i++) {
      let tile = document.getElementById(
        i.toString() + "-" + (2 - i).toString()
      );
      tile.classList.add(tile);
    }
    gameover = true;
    return;
  }
}
