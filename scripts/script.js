const gameBoard = (function() {
  const board = [];

  const setupBoard = () => {
    for (let i = 0; i < 9; i++) {
      board.push(Cell());
    }
  }

  const getBoard = () => board;

  const dropToken = (index, player) => {
    if (board[index].getValue() !== 0) return;

    board[index].addToken(player);
  }

  const clearBoard = () => {
    board.length = 0;
  }

  setupBoard();

  return { setupBoard, getBoard, dropToken, clearBoard }
})();


function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  }

  const getValue = () => value;

  return { addToken, getValue };
}


function GameController(
  player1Name = 'player 1',
  player2Name = 'player 2'
) {
  const players = [
    {
      name: player1Name,
      token: 'x',
      score: 0
    },
    {
      name: player2Name,
      token: 'o',
      score: 0
    }

  ];

  const dialog = document.querySelector('dialog');

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
  }

  const getActivePlayer = () => activePlayer;

  const getScores = () => {
    return [players[0].score, players[1].score]
  }

  const playRound = (index) => {
    gameBoard.dropToken(index, getActivePlayer().token)
    if (checkWin()) {
      getActivePlayer().score++
      dialog.showModal();
    } else {
      switchPlayerTurn();
    }
  }

  const checkWin = () => {
    const boardArray = gameBoard.getBoard();
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i <= 7; i++) {
      const winCondition = winConditions[i];

      let a = boardArray[winCondition[0]].getValue();
      let b = boardArray[winCondition[1]].getValue();
      let c = boardArray[winCondition[2]].getValue();

      if (a === 0 || b === 0 || c === 0) {
        continue
      }

      if (a === b && b === c) {
        return true
      }
    }
    return false;
  }

  const reset = () => {
    gameBoard.clearBoard();
    gameBoard.setupBoard();
    activePlayer = players[0];
  }

  return { getActivePlayer, getScores, playRound, reset }
}


const displayController = (function() {
  const game = GameController();

  const boardDiv = document.querySelector('.board');
  const playerTurnDiv = document.querySelector('.playerTurn');
  const score = document.querySelector('.score');
  const dialog = document.querySelector('dialog');
  const anotherRoundButton = document.querySelector('.another');

  const updateScreen = () => {
    boardDiv.textContent = '';
    score.textContent = `Player 1: ${game.getScores()[0]} Player 2: ${game.getScores()[1]}`

    const board = gameBoard.getBoard();
    const currentPlayer = game.getActivePlayer();

    playerTurnDiv.textContent = `Player ${currentPlayer.name}'s turn now`;

    board.forEach((square, index) => {
      const button = document.createElement('button');
      button.classList.add('cell');
      button.dataset.index = index;
      button.textContent = board[index].getValue() === 0 ? '' : board[index].getValue();

      boardDiv.appendChild(button);
    })
  }

  const removeBoardChildren = () => {
    while (boardDiv.firstChild) {
      boardDiv.removeChild(boardDiv.firstChild)
    }
  }

  function clickHandler(e) {
    const selectedCell = e.target.dataset.index;

    if (!selectedCell) return;

    game.playRound(selectedCell);
    updateScreen();
  }

  boardDiv.addEventListener('click', clickHandler)

  anotherRoundButton.addEventListener('click', () => {
    dialog.close();
    game.reset();
    removeBoardChildren();
    updateScreen();
  })

  updateScreen();

})();
