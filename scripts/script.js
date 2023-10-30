const gameBoard = [
  null, null, null,
  null, null, null,
  null, null, null,
]

const displayController = (function() {
  // parse the board array and display markers
  const boardDiv = document.querySelector('.board');

  const createDiv = function(element) {
    let divClass = null;
    const currentDiv = document.createElement('div');

    switch (element) {
      case 'x':
        divClass = '.x';
        break;
      case 'o':
        divClass = '.o';
        break
      default:
        divClass = '.blank';
    }

    currentDiv.classList.add(divClass);

    return currentDiv;
  }

  const populateBoard = function() {
    gameBoard.forEach((element) => boardDiv.appendChild(createDiv(element)));
  }

  return { populateBoard }
})();

displayController.populateBoard();
