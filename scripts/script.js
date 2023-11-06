const gameBoard = (function() {
  const board = [
    null, null, null,
    null, null, null,
    null, null, null,
  ]

  const markers = ['x', 'o'];

  return { board, markers }
})();

const displayController = (function() {
  // parse the board array and display markers
  const boardDiv = document.querySelector('.board');

  const createDiv = function(element) {
    let divClass = null;
    const currentDiv = document.createElement('div');

    switch (element) {
      case 'x':
        divClass = 'x';
        break;
      case 'o':
        divClass = 'o';
        break
      default:
        divClass = 'blank';
    }

    currentDiv.classList.add(divClass);

    return currentDiv;
  }

  const setUpBoard = function() {
    gameBoard.board.forEach((element, index) => {
      boardDiv.appendChild(createDiv(element));
      boardDiv.lastChild.setAttribute('id', index);
    })
  }


  const populateBoard = function() {
    gameBoard.board.forEach((element) => {
      boardDiv.appendChild(createDiv(element));
    })
  }

  const assignIcons = function() {
    const allXMarkers = document.querySelectorAll('.x');
    const allOMarkers = document.querySelectorAll('.o');

    const xImagePath = '../images/close-thick.svg';
    const oImagePath = '../images/circle-outline.svg';

    const addImgElement = function(array, imagePath) {

      array.forEach(function(element) {
        const img = document.createElement('img');
        img.src = imagePath;
        element.appendChild(img);
      })
    }

    addImgElement(allXMarkers, xImagePath);
    addImgElement(allOMarkers, oImagePath);
  }

  const setUpMarkerEvents = function() {
    const allMarkers = document.querySelectorAll('.board > div');
    allMarkers.forEach((marker) => marker.addEventListener('click', function() {
      marker.setAttribute('class', game.getCurrentPlayer().marker);
      game.getCurrentPlayer().markerHistory.push(marker.id);
      game.endTurn();
    }))
  }

  return { setUpBoard, populateBoard, assignIcons, setUpMarkerEvents }
})();

function createPlayer(name) {
  const marker = gameBoard.markers.shift();
  const markerHistory = [];

  return { name, marker, markerHistory };
}

const game = (function() {
  let over = false;
  let winner = null;
  const player1 = createPlayer('test');
  const player2 = createPlayer('test2');
  let currentPlayer = player1;

  const getCurrentPlayer = function() {
    return currentPlayer;
  }

  const start = function() {
    displayController.setUpBoard();
    displayController.setUpMarkerEvents();
  }

  const end = function() {
    // stuff here
  }

  const endTurn = function() {
    if (currentPlayer.marker == player1.marker) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  }

  const checkWinOrTie = function(mark) {
    const numOfSquares = 3;

  }

  return { start, getCurrentPlayer, endTurn, player1, player2 }
})();

game.start();
