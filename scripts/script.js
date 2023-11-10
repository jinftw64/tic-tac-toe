const events = {
  events: {},
  on: function(eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  off: function(eventName, fn) {
    if (this.events[eventName]) {
      for (let i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  },
  emit: function(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function(fn) {
        fn(data);
      })
    }
  }
}


const gameBoard = (function() {
  const board = [];

  for (let i = 0; i < 9; i++) {
    board.push(Cell());
  }

  const getBoard = () => board;

  const dropToken = (index, player) => {
    if (board[index].getValue() !== 0) return;

    board[index].addToken(player);
  }

  return { getBoard, dropToken }
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
      token: 'x'
    },
    {
      name: player2Name,
      token: 'o'
    }

  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
  }

  const getActivePlayer = () => activePlayer;

  const playRound = (index) => {
    gameBoard.dropToken(index, getActivePlayer().token)
    if (checkWin()) {
      console.log(`${getActivePlayer().name} has won`);
    }
    switchPlayerTurn();
    console.log(`${getActivePlayer().name} turn now`);
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

      return false;
    }
  }

  return { getActivePlayer, playRound }
}


const displayController = (function() {
  // pass
})();

const game = GameController();
