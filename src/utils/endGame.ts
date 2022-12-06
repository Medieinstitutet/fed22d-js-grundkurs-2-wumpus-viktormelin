import { boardElement, gameBoard, informationElement, modalElement, startGameButton } from '@/stores/store';
import Global from '@/stores/variables';

let isModalOpen = false;

const resetGame = () => {
  informationElement.classList.toggle('hidden');
  startGameButton.innerHTML = 'Starta Spelet';

  // Remove visual elements from gameboard
  boardElement.innerHTML = '';
  const scoreElement = informationElement.querySelector('.information__score') as HTMLElement;
  scoreElement.innerHTML = '';

  // Clear gameBoard array
  gameBoard.splice(0, gameBoard.length);

  // Reset all Global variables
  Global.isGameStarted = false;
  Global.currentPosition = 0;
  Global.previousPosition = 0;
  Global.score = 0;

  if (isModalOpen) {
    modalElement.classList.toggle('hidden');
  }
};

const endGame = (type: string) => {
  modalElement.classList.toggle('hidden');

  const h1Element = modalElement.querySelector('h2') as HTMLHeadingElement;
  const pElement = modalElement.querySelector('p') as HTMLParagraphElement;
  const buttonElement = modalElement.querySelector('button') as HTMLButtonElement;
  h1Element.innerText = '';
  pElement.innerText = '';

  switch (type) {
    case 'hole':
      h1Element.innerText = 'Du förlorade!';
      pElement.innerText = 'Du ramlade ner i ett hål och förlorade spelet';
      isModalOpen = true;

      buttonElement.addEventListener('click', resetGame);
      break;
    case 'wumpus':
      h1Element.innerText = 'Du förlorade!';
      pElement.innerText = 'Du blev uppäten av Wumpus och förlorade spelet';
      isModalOpen = true;

      buttonElement.addEventListener('click', resetGame);
      break;
    case 'restart':
      resetGame();
      break;

    default:
      break;
  }
};

export default endGame;
