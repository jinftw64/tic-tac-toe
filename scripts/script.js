// const gameBoard = (function() {
//   const board = [
//     null, null, null,
//     null, null, null,
//     null, null, null,
//   ]
//
//   const markers = ['x', 'o'];
//
//   return { board, markers }
// })();
//
// const displayController = (function() {
//   // parse the board array and display markers
//   const boardDiv = document.querySelector('.board');
//
//   const createDiv = function(element) {
//     let divClass = null;
//     const currentDiv = document.createElement('div');
//
//     switch (element) {
//       case 'x':
//         divClass = 'x';
//         break;
//       case 'o':
//         divClass = 'o';
//         break
//       default:
//         divClass = 'blank';
//     }
//
//     currentDiv.classList.add(divClass);
//
//     return currentDiv;
//   }
//
//   const setUpBoard = function() {
//     gameBoard.board.forEach((element, index) => {
//       boardDiv.appendChild(createDiv(element));
//       boardDiv.lastChild.setAttribute('id', index);
//     })
//   }
//
//
//   const populateBoard = function() {
//     gameBoard.board.forEach((element) => {
//       boardDiv.appendChild(createDiv(element));
//     })
//   }
//
//   const updateBoardArray = function(markerDiv) {
//     const id = markerDiv.id;
//     const marker = markerDiv.className;
//     gameBoard.board.splice(id, 1, marker);
//   }
//
//   const assignIcons = function() {
//     const allXMarkers = document.querySelectorAll('.x');
//     const allOMarkers = document.querySelectorAll('.o');
//
//     const xImagePath = '../images/close-thick.svg';
//     const oImagePath = '../images/circle-outline.svg';
//
//     const addImgElement = function(array, imagePath) {
//
//       array.forEach(function(element) {
//         const img = document.createElement('img');
//         img.src = imagePath;
//         element.appendChild(img);
//       })
//     }
//
//     addImgElement(allXMarkers, xImagePath);
//     addImgElement(allOMarkers, oImagePath);
//   }
//
//   const setUpMarkerEvents = function() {
//     const allMarkers = document.querySelectorAll('.board > div');
//     allMarkers.forEach((marker) => marker.addEventListener('click', function() {
//       marker.setAttribute('class', game.getCurrentPlayer().marker);
//       updateBoardArray(marker);
//       game.checkWinOrTie();
//       game.endTurn();
//     }))
//   }
//
//   return { setUpBoard, populateBoard, assignIcons, setUpMarkerEvents, updateBoardArray }
// })();
//
// function createPlayer(name) {
//   const marker = gameBoard.markers.shift();
//
//   return { name, marker };
// }
//
// const game = (function() {
//   let over = false;
//   let winner = null;
//   const player1 = createPlayer('test');
//   const player2 = createPlayer('test2');
//   let currentPlayer = player1;
//
//   const getCurrentPlayer = function() {
//     return currentPlayer;
//   }
//
//   const start = function() {
//     displayController.setUpBoard();
//     displayController.setUpMarkerEvents();
//   }
//
//   const end = function() {
//     // stuff here
//   }
//
//   const endTurn = function() {
//     if (currentPlayer.marker == player1.marker) {
//       currentPlayer = player2;
//     } else {
//       currentPlayer = player1;
//     }
//   }
//
//   const checkWinOrTie = function() {
//     const winningConditions = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6]
//     ];
//     for (let i = 0; i <= 7; i++) {
//       const winCondition = winningConditions[i];
//       let a = gameBoard.board[winCondition[0]];
//       let b = gameBoard.board[winCondition[1]];
//       let c = gameBoard.board[winCondition[2]];
//
//       if (a === null || b === null || c === null) {
//         continue;
//       }
//
//       if (a === b && b === c) {
//         console.log(`${game.getCurrentPlayer().name} won`);
//       }
//     }
//
//   }
//
//   return { start, getCurrentPlayer, endTurn, checkWinOrTie, player1, player2 }
// })();
//
// game.start();

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
