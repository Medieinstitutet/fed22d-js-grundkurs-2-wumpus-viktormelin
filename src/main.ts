import floorImage1 from '@/assets/floor.png';
import floorImage2 from '@/assets/floor_1.png';
import playerDownImage from '@/assets/player_facing_to_down.png';
import playerLeftImage from '@/assets/player_facing_to_left.png';
import playerRightImage from '@/assets/player_facing_to_right.png';
import playerUpImage from '@/assets/player_facing_to_up.png';
import '@/style/style.scss';
import { Position } from '@/typings/types';

const boardElement = document.querySelector('.board') as HTMLElement;
const leaderboardElement = document.querySelector('.leaderboard') as HTMLElement;
const startGameButton = document.querySelector('#startGameButton') as HTMLButtonElement;
const keyboardKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter'];

const gameBoard: Position[] = [];
let isGameStarted = false;
let currentPosition: Position;
let currentPositionElement: HTMLElement;
let stepsTaken = 0;

const updateSteps = () => {
  const stepsTakenElement = leaderboardElement.querySelector('ul [data-id="0"] span') as HTMLElement;
  stepsTaken += 1;
  stepsTakenElement.innerHTML = String(stepsTaken);
};

const updatePlayerPosition = (direction: string) => {
  // Find current tile image and set it to a empty image to not have error show (probably not very good for a11y...)
  const currentPositionImageElement = currentPositionElement.querySelector('.playerImg') as HTMLImageElement;
  currentPositionImageElement.src =
    "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E";

  currentPositionElement = boardElement.querySelector(`[data-tile="${currentPosition.id}"]`) as HTMLElement;

  const tileImageElement = currentPositionElement.querySelector('.tileImg') as HTMLImageElement;
  const playerImageElement = currentPositionElement.querySelector('.playerImg') as HTMLImageElement;

  updateSteps();

  switch (direction) {
    case 'up':
      tileImageElement.src = floorImage1;
      playerImageElement.src = playerUpImage;
      break;
    case 'down':
      tileImageElement.src = floorImage1;
      playerImageElement.src = playerDownImage;
      break;
    case 'left':
      tileImageElement.src = floorImage1;
      playerImageElement.src = playerLeftImage;
      break;
    case 'right':
      tileImageElement.src = floorImage1;
      playerImageElement.src = playerRightImage;
      break;

    default:
      break;
  }
};

const handleMovement = (e: KeyboardEvent) => {
  if (keyboardKeys.includes(e.key) && isGameStarted) {
    switch (e.key) {
      case 'ArrowLeft':
        if (currentPosition.coord[1] === 0) {
          currentPosition.coord[1] = 4;
        } else {
          currentPosition.coord[1] -= 1;
        }

        currentPosition.id = currentPosition.coord.toString().replace(',', '');
        updatePlayerPosition('left');

        break;
      case 'ArrowRight':
        if (currentPosition.coord[1] === 4) {
          currentPosition.coord[1] = 0;
        } else {
          currentPosition.coord[1] += 1;
        }

        currentPosition.id = currentPosition.coord.toString().replace(',', '');
        updatePlayerPosition('right');

        break;
      case 'ArrowUp':
        if (currentPosition.coord[0] === 0) {
          currentPosition.coord[0] = 3;
        } else {
          currentPosition.coord[0] -= 1;
        }

        currentPosition.id = currentPosition.coord.toString().replace(',', '');
        updatePlayerPosition('up');

        break;
      case 'ArrowDown':
        if (currentPosition.coord[0] === 3) {
          currentPosition.coord[0] = 0;
        } else {
          currentPosition.coord[0] += 1;
        }

        currentPosition.id = currentPosition.coord.toString().replace(',', '');
        updatePlayerPosition('down');

        break;
      default:
        break;
    }
  }
};

const generateGameBoard = () => {
  const gridSize = [4, 5];
  const percentageHoles = 0.2;
  const percentageBats = 0.3;

  let holes = 0;
  let bats = 0;
  let wumpus = false;

  for (let i = 0; i < gridSize[0]; i += 1) {
    for (let j = 0; j < gridSize[1]; j += 1) {
      const coord = [i, j];
      const id = coord.toString().replace(',', '');
      const danger = null;
      gameBoard.push({ coord, id, danger });
    }
  }

  while (!wumpus) {
    const index = Math.floor(Math.random() * gameBoard.length);
    const wumpusTile = gameBoard[index];
    if (wumpusTile !== currentPosition) {
      wumpus = true;
      gameBoard[index].danger = 'wumpus';
      break;
    }
  }

  while (holes < gridSize[0] * gridSize[1] * percentageHoles) {
    const index = Math.floor(Math.random() * gameBoard.length);
    const holeTile = gameBoard[index];
    if (holeTile !== currentPosition && holeTile.danger === null) {
      holes += 1;
      gameBoard[index].danger = 'hole';

      if (holes >= (gridSize[0] * gridSize[1]) / percentageHoles) {
        break;
      }
    }
  }

  while (bats < gridSize[0] * gridSize[1] * percentageBats) {
    const index = Math.floor(Math.random() * gameBoard.length);
    const holeTile = gameBoard[index];
    if (holeTile !== currentPosition && holeTile.danger === null) {
      bats += 1;
      gameBoard[index].danger = 'bat';

      if (bats >= (gridSize[0] * gridSize[1]) / percentageHoles) {
        break;
      }
    }
  }
};

const initGameBoard = () => {
  if (isGameStarted) {
    console.log('Restart Game...');
  } else {
    isGameStarted = true;
    boardElement.innerHTML = '';

    generateGameBoard();

    for (const tile of gameBoard) {
      boardElement.innerHTML +=
        /* HTML */
        `<div data-tile="${tile.id}" class="board__tile">
          <img src="${floorImage2}" class="tileImg" width="64" height="64" />
          <img
            src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
            class="playerImg"
            width="32"
            height="32"
          />
        </div>`;
    }

    currentPosition = gameBoard[Math.floor(Math.random() * gameBoard.length)];
    currentPositionElement = boardElement.querySelector(`[data-tile="${currentPosition.id}"]`) as HTMLElement;

    const tileImageElement = currentPositionElement.querySelector('.tileImg') as HTMLImageElement;
    const playerImageElement = currentPositionElement.querySelector('.playerImg') as HTMLImageElement;
    const stepsTakenElement = leaderboardElement.querySelector('ul [data-id="0"]') as HTMLElement;

    tileImageElement.src = floorImage1;
    playerImageElement.src = playerDownImage;
    stepsTakenElement.classList.toggle('hidden');
    startGameButton.innerHTML = 'Restart Game';

    document.addEventListener('keyup', handleMovement);
  }
};

startGameButton.addEventListener('click', initGameBoard);
