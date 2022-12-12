import {
  boardElement,
  gameBoard,
  images,
  informationElement,
  leaderboard,
  locales,
  modalElement,
  startGameButton,
  winModal,
} from '@/stores/store';
// import coinImage from '@/assets/score-icon.png';
import Global from '@/stores/variables';

let isLooseModalOpen = false;
let isWinModalOpen = false;

const resetGame = () => {
  informationElement.classList.toggle('hidden');
  startGameButton.innerHTML = locales.info.startGame;

  // Remove visual elements from gameboard
  boardElement.innerHTML = '';
  // const scoreElement = informationElement.querySelector('.information__score') as HTMLElement;
  // scoreElement.innerHTML = '';

  // Clear gameBoard array
  gameBoard.splice(0, gameBoard.length);

  // Reset all Global variables
  Global.isGameStarted = false;
  Global.currentPosition = 0;
  Global.previousPosition = 0;
  Global.score = 0;

  if (isLooseModalOpen) {
    isLooseModalOpen = false;
    modalElement.classList.toggle('hidden');
  }
  if (isWinModalOpen) {
    isWinModalOpen = false;
    winModal.classList.toggle('hidden');
  }
};

export const refreshLeaderboard = () => {
  const listElement = document.querySelector('.leaderboard__entries') as HTMLUListElement;
  const sortedLeaderboard = leaderboard.length > 0 ? leaderboard.sort((a, b) => a.score - b.score) : leaderboard;
  const length = sortedLeaderboard.length < 3 ? sortedLeaderboard.length : 3;

  if (sortedLeaderboard.length > 0) {
    for (let i = 0; i < length; i += 1) {
      listElement.innerHTML += `
      <li 
        class="leaderboard__entries_item" 
        data-id="${i + 1}"
      >
        ${i + 1}. 
        <span>
          ${sortedLeaderboard[i].name}
        </span>
        <span>
          ${sortedLeaderboard[i].score}
          <img src="${images.coin}" width="16" height="16" />
        </span>
      </li>`;
    }
  }
};

const endGame = (type: string) => {
  if (type === 'restart') {
    resetGame();
  } else if (type === 'win') {
    isWinModalOpen = true;
    winModal.classList.toggle('hidden');
    const buttonElement = winModal.querySelector('button') as HTMLButtonElement;

    buttonElement.addEventListener('click', () => {
      const name = winModal.querySelector('input')?.value;
      if (name && name !== '') {
        const { score } = Global;
        leaderboard.push({ name, score });
        refreshLeaderboard();
        resetGame();
      }
    });
  } else {
    modalElement.classList.toggle('hidden');

    const pElement = modalElement.querySelector('p') as HTMLParagraphElement;
    const buttonElement = modalElement.querySelector('button') as HTMLButtonElement;
    pElement.innerText = '';

    if (type === 'hole') {
      pElement.innerText = locales.info.failHole;
      isLooseModalOpen = true;

      buttonElement.addEventListener('click', resetGame);
    } else {
      pElement.innerText = locales.info.failWumpus;
      isLooseModalOpen = true;

      buttonElement.addEventListener('click', resetGame);
    }
  }
};

export default endGame;
