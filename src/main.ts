import floorImage1 from '@/assets/floor.png';
import floorImage2 from '@/assets/floor_1.png';
import playerDownImage from '@/assets/player_facing_to_down.png';
import coinImage from '@/assets/score-icon.png';
import { boardElement, gameBoard, informationElement, startGameButton } from '@/stores/store';
import Global from '@/stores/variables';
import HandleMovement from '@/utils/handleMovement';
import GenerateGameBoard from '@/utils/generateGameBoard';
import '@/style/style.scss';
import CheckSurroundings from './utils/checkSurroundings';

const initGameBoard = () => {
  if (Global.isGameStarted) {
    console.log('Restart Game...');
  } else {
    Global.isGameStarted = true;
    Global.currentPosition = Math.floor(Math.random() * gameBoard.length);

    GenerateGameBoard();
    CheckSurroundings();

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

    const scoreElement = informationElement.querySelector('.information__score') as HTMLElement;
    scoreElement.innerHTML += `<p>Poäng: ${Global.score}</p>`;
    scoreElement.innerHTML += `<img src="${coinImage}" width="16" height="16" />`;

    startGameButton.innerHTML = 'Starta om Spelet';
    document.addEventListener('keyup', HandleMovement);
  }
};

startGameButton.addEventListener('click', initGameBoard);
