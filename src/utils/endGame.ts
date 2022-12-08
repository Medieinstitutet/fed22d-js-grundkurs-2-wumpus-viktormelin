import {
  boardElement,
  gameBoard,
  informationElement,
  leaderboard,
  modalElement,
  startGameButton,
} from '@/stores/store';
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

export const refreshLeaderboard = () => {
  const listElement = document.querySelector('.leaderboard__entries') as HTMLUListElement;
  const sortedLeaderboard = leaderboard.sort((a, b) => a.score - b.score);

  if (sortedLeaderboard.length > 0) {
    for (let i = 0; i < 3; i += 1) {
      listElement.innerHTML += `<li class="leaderboard__entries_item" data-id="${i + 1}">${i + 1}. <span>${
        sortedLeaderboard[i].score
      }</span></li>`;
    }
  }
};

const winGame = () => {
  console.log('Clicked button');

  const name = modalElement.querySelector('input')?.value as string;
  const { score } = Global;

  console.log(name, score);

  leaderboard.push({ name, score });
  console.log(leaderboard);

  refreshLeaderboard();
  resetGame();
};

const endGame = (type: string) => {
  if (type === 'restart') {
    resetGame();
  } else if (type === 'win') {
    modalElement.classList.toggle('hidden');

    const h1Element = modalElement.querySelector('h2') as HTMLHeadingElement;
    const pElement = modalElement.querySelector('p') as HTMLParagraphElement;
    const buttonElement = modalElement.querySelector('button') as HTMLButtonElement;
    h1Element.innerText = 'Du vann!';
    pElement.innerText = `Din poäng blev ${Global.score}`;
    modalElement.innerHTML += `
      <label>Skriv ditt namn för topplistan: <input type="text" name="nameinput" id="nameinput" /></label>
    `;

    buttonElement.addEventListener('click', () => {
      console.log('clicked button');
      winGame();
    });
    console.log(buttonElement);
  } else {
    modalElement.classList.toggle('hidden');

    const h1Element = modalElement.querySelector('h2') as HTMLHeadingElement;
    const pElement = modalElement.querySelector('p') as HTMLParagraphElement;
    const buttonElement = modalElement.querySelector('button') as HTMLButtonElement;
    h1Element.innerText = '';
    pElement.innerText = '';

    if (type === 'hole') {
      h1Element.innerText = 'Du förlorade!';
      pElement.innerText = 'Du ramlade ner i ett hål och förlorade spelet';
      isModalOpen = true;

      buttonElement.addEventListener('click', resetGame);
    } else {
      h1Element.innerText = 'Du förlorade!';
      pElement.innerText = 'Du blev uppäten av Wumpus och förlorade spelet';
      isModalOpen = true;

      buttonElement.addEventListener('click', resetGame);
    }
  }
};

export default endGame;
