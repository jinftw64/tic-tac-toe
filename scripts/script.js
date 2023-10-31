const gameBoard = [
  'x', null, null,
  null, 'x', null,
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

  const populateBoard = function() {
    gameBoard.forEach((element) => boardDiv.appendChild(createDiv(element)));
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

  return { populateBoard, assignIcons }
})();

displayController.populateBoard();
displayController.assignIcons();
