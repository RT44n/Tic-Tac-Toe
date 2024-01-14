const gameBoard = (function () {
  //Creates a new board
  const newBoard = ["", "", "", "", "", "", "", "", ""];

  //Clears the board
  const clearBoard = [null];

  //Prints the tic=tac-toe board
  const printBoard = (board) => {
    let size = 3;
    let result = [];
    for (let i = 0; i < board.length; i += size) {
      result.push(board.slice(i, i + size));
    }
    return console.log(result);
  };
  return { newBoard, clearBoard, printBoard };
})();

const playGame = (function () {
  //Stores players
  const players = [
    { player: "player1", mark: "X" },
    { Player: "player2", mark: "O" },
  ];

  //Asks the player for their choice of 'mark' and assigns it to them.
  const getPlayer = () => {
    let getMark = prompt("Choose your mark. 'X' or 'O'").toLowerCase();

    if (getMark === "x") {
      return (currentPlayer = players[0]);
    } else if (getMark === "o") return (currentPlayer = players[1]);
  };

  //Changes player. To be used after every mark
  const changePLayer = () => {
    if (currentPlayer === players[0]) {
      currentPlayer = players[1];
    } else if (currentPlayer === players[1]) {
      currentPlayer = players[0];
    }
  };

  const whichPlayer = () => {
    return currentPlayer.player;
  };

  //Creates a new game board for this instance
  const board = gameBoard.newBoard;

  //Prints the current instance of the board
  const displayBoard = () => {
    gameBoard.printBoard(board);
  };

  //Marks the board after asking for player input
  const markBoard = (tileNo) => {
    let tile = tileNo;

    if (board[tile] === "X" || board[tile] === "Y") {
      return alert("ERROR"), markBoard();
    } else {
      board.splice(tile, 1, "X");
    }
  };
  const gameState = board;
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const winGame = () => {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];

      if (a == "" || b == "" || c == "") {
        continue;
      }
      if (a === b && b === c) {
        return (roundWon = true);
      }
    }
  };
  return {
    board,
    displayBoard,
    markBoard,
    getPlayer,
    changePLayer,
    winGame,
    whichPlayer,
  };
})();

const gameController = (function () {
  const startGame = () => {
    playGame.board;
    playGame.displayBoard();
    playGame.getPlayer();
    let currentPlayer;
    let winCheck;
    while (winCheck !== true) {
      playGame.markBoard();
      playGame.displayBoard();
      winCheck = playGame.winGame();
      currentPlayer = playGame.whichPlayer();
      playGame.changePLayer();
    }
    console.log("There is a winner" + currentPlayer + " won!");
  };
  return { startGame };
})();

const DomGame = (function () {
  const startNewGame = document.querySelector("#startBtn");
  const tiles = document.querySelectorAll(".tiles");

  startNewGame.addEventListener("click", () => {
    tiles.textContent = "";
    board = playGame.board;
    playGame.displayBoard();
    startNewGame.textContent = "Restart";
    playGame.getPlayer();
  });

  tiles.forEach((tileBox) => {
    tileBox.addEventListener("click", (e) => {
      console.log("clicked" + tileBox.id);
      playGame.markBoard(tileBox.id);
      tileBox.textContent = playGame.board[tileBox.id];
      playGame.changePLayer();
      startNewGame.addEventListener("click", (e) => {
        tileBox.textContent = "";
      });
    });
  });
  return { startNewGame, tiles };
})();
