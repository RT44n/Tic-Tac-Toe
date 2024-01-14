function gameBoard() {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const markBoard = (tile, mark) => {
    if (board[tile] === "X" || board[tile] === "Y") {
      return;
    } else {
      board.splice(tile, 1, mark);
    }
  };

  const printBoard = () => {
    let size = 3;
    let result = [];
    for (let i = 0; i < board.length; i += size) {
      result.push(board.slice(i, i + size));
    }
    return console.log(result);
  };
  return { getBoard, markBoard, printBoard };
}
function gameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = gameBoard();

  const players = [
    {
      name: playerOneName,
      mark: "X",
    },
    {
      name: playerTwoName,
      mark: "Y",
    },
  ];

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

  const winGame = (board) => {
    const gameState = board;
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];

      if (
        typeof a == "number" ||
        typeof b == "number" ||
        typeof c == "number"
      ) {
        break;
      }
      if (a === b && b === c) {
        return (roundWon = true);
      } else return (roundWon = false);
    }
  };

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (tile) => {
    console.log(`Marking ${getActivePlayer().name}'s tile ${tile}...`);
    board.markBoard(tile, getActivePlayer().mark);
    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
  };
}

function ScreenController() {
  const game = gameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

  const updateScreen = () => {
    boardDiv.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

    board.forEach((tile) => {
      const tileButton = document.createElement("div");
      tileButton.classList.add("tile");

      tileButton.dataset.tile = board.indexOf(tile);
      tileButton.textContent = tile;
      boardDiv.appendChild(tileButton);
    });
  };
  function clickHandlerBoard(e) {
    const selectedTile = e.target.dataset.tile;
    if (!selectedTile) return;

    game.playRound(selectedTile);
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);

  updateScreen();
}

ScreenController();
