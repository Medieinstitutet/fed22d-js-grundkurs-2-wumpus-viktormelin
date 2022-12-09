import floorImage1 from '@/assets/floor.png';
import floorImage2 from '@/assets/floor_1.png';
import playerDownImage from '@/assets/player_facing_to_down.png';
import coinImage from '@/assets/score-icon.png';
import arrowImage from '@/assets/arrow-icon.png';
import {
  boardElement,
  controlsElement,
  gameBoard,
  informationElement,
  showControlsButton,
  startGameButton,
} from '@/stores/store';
import Global from '@/stores/variables';
import handleMovement from '@/utils/handleMovement';
import generateGameBoard from '@/utils/generateGameBoard';
import '@/style/style.scss';
import checkSurroundings from '@/utils/checkSurroundings';
import endGame, { refreshLeaderboard } from '@/utils/endGame';

let isControlsShowing = false;

const showControlsModal = () => {
  controlsElement.classList.toggle('hidden');
  isControlsShowing = !isControlsShowing;

  if (isControlsShowing) {
    const buttonElement = controlsElement.querySelector('button') as HTMLButtonElement;
    buttonElement.addEventListener('click', showControlsModal);
  }
};

const initGameBoard = () => {
  if (Global.isGameStarted) {
    endGame('restart');
  } else {
    Global.isGameStarted = true;
    Global.currentPosition = Math.floor(Math.random() * gameBoard.length);

    refreshLeaderboard();
    generateGameBoard();
    checkSurroundings();

    boardElement.innerHTML = '';

    for (const tile of gameBoard) {
      boardElement.innerHTML +=
        /* HTML */
        `<div data-tile="${tile.id}" class="board__tile">
          ${Global.isDebug ? `<p style="position: absolute; z-index: 100;">${tile.id}</p>` : ''}
          <img src="${floorImage2}" class="tileimg" width="64" height="64" />
          <img
            src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
            class="playerimg"
            width="32"
            height="32"
          />
          <img
            src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
            class="dangerimg"
            width="32"
            height="32"
          />
        </div>`;
    }

    const currentPositionElement = boardElement.querySelector(
      `[data-tile="${gameBoard[Global.currentPosition].id}"]`
    ) as HTMLElement;
    const tileImageElement = currentPositionElement.querySelector('.tileimg') as HTMLImageElement;
    const playerImageElement = currentPositionElement.querySelector('.playerimg') as HTMLImageElement;

    tileImageElement.src = floorImage1;
    playerImageElement.src = playerDownImage;

    informationElement.classList.toggle('hidden');

    const information = informationElement.querySelector('.information__score') as HTMLElement;
    const scoreSpanElement = information.querySelector('.information__score_points span') as HTMLSpanElement;
    const scoreImageElement = information.querySelector('.information__score_points img') as HTMLImageElement;
    const arrowSpanElement = information.querySelector('.information__score_arrows span') as HTMLSpanElement;
    const arrowImageElement = information.querySelector('.information__score_arrows img') as HTMLImageElement;

    scoreSpanElement.innerText = String(Global.score);
    scoreImageElement.src = coinImage;

    arrowSpanElement.innerText = String(Global.arrows);
    arrowImageElement.src = arrowImage;

    startGameButton.innerHTML = 'Avsluta Spelet';
    document.addEventListener('keyup', handleMovement);
  }
};

showControlsButton.addEventListener('click', showControlsModal);
startGameButton.addEventListener('click', initGameBoard);
