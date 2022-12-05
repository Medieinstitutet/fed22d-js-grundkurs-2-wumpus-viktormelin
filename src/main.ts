import arrowImage from '@/assets/arrow-icon.png';
import batImage from '@/assets/bat.png';
import floorImage1 from '@/assets/floor.png';
import floorImage2 from '@/assets/floor_1.png';
import playerDownImage from '@/assets/player_facing_to_down.png';
import playerLeftImage from '@/assets/player_facing_to_left.png';
import playerRightImage from '@/assets/player_facing_to_right.png';
import playerUpImage from '@/assets/player_facing_to_up.png';
import coinImage from '@/assets/score-icon.png';
import wumpusImage from '@/assets/wumpus.png';
import { boardElement, gameBoard, informationElement, leaderboardElement, startGameButton } from '@/stores/store';
import Global from '@/stores/variables';
import '@/style/style.scss';
import HandleMovement from '@/utils/HandleMovement';

import GenerateGameBoard from './utils/GenerateGameBoard';

// const boardElement = document.querySelector('.board') as HTMLElement;
// const leaderboardElement = document.querySelector('.leaderboard') as HTMLElement;
// const startGameButton = document.querySelector('#startGameButton') as HTMLButtonElement;
// const keyboardKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter'];

// const gameBoard: Position[] = [];
// let isGameStarted = false;
// let currentPosition: number;
// let previousPosition: number;
// let currentPositionElement: HTMLElement;
// let stepsTaken = 0;

const initGameBoard = () => {
  if (Global.isGameStarted) {
    console.log('Restart Game...');
  } else {
    Global.isGameStarted = true;
    Global.currentPosition = Math.floor(Math.random() * gameBoard.length);

    GenerateGameBoard();

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

    // currentPosition = gameBoard[Math.floor(Math.random() * gameBoard.length)];

    const currentPositionElement = boardElement.querySelector(
      `[data-tile="${gameBoard[Global.currentPosition].id}"]`
    ) as HTMLElement;
    const tileImageElement = currentPositionElement.querySelector('.tileimg') as HTMLImageElement;
    const playerImageElement = currentPositionElement.querySelector('.playerimg') as HTMLImageElement;

    tileImageElement.src = floorImage1;
    playerImageElement.src = playerDownImage;

    informationElement.classList.toggle('hidden');
    informationElement.querySelector('.information__score')!.innerHTML += `<p>Current Score: ${Global.stepsTaken}</p>`;
    informationElement.querySelector(
      '.information__score'
    )!.innerHTML += `<img src="${coinImage}" width="16" heigh="16" />`;

    startGameButton.innerHTML = 'Restart Game';
    document.addEventListener('keyup', HandleMovement);
  }
};

startGameButton.addEventListener('click', initGameBoard);
