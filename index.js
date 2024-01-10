function gameBoard() {
  let gameSquares = [];
  const gameSquaresNumber = 3;
  for (i = 0; i < gameSquaresNumber * gameSquaresNumber; i++) {
    gameSquares.push(i);
  }
  return console.log(gameSquares);
}
