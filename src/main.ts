import floorImage1 from '@/assets/floor.png';
import floorImage2 from '@/assets/floor_1.png';
import playerDownImage from '@/assets/player_facing_to_down.png';
import playerLeftImage from '@/assets/player_facing_to_left.png';
import playerRightImage from '@/assets/player_facing_to_right.png';
import playerUpImage from '@/assets/player_facing_to_up.png';
import '@/style/style.scss';
import { Position } from '@/typings/types';

const boardElement = document.querySelector('#board') as HTMLElement;
const startGameButton = document.querySelector('#startGameButton');
const keyboardKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

const gameBoard: Position[] = [];
let currentPosition: Position;
let currentPositionElement: HTMLElement;

const updatePlayerPosition = (direction: string) => {
  // Find current tile image and set it to a empty image to not have error show
  const currentPositionImageElement = currentPositionElement.querySelector('.playerImg') as HTMLImageElement;
  currentPositionImageElement.src =
    "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E";

  currentPositionElement = boardElement.querySelector(`[data-tile="${currentPosition.id}"]`) as HTMLElement;

  const tileImageElement = currentPositionElement.querySelector('.tileImg') as HTMLImageElement;
  const playerImageElement = currentPositionElement.querySelector('.playerImg') as HTMLImageElement;

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
  if (keyboardKeys.includes(e.key)) {
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

const initGameBoard = () => {
  boardElement.innerHTML = '';
  for (let i = 0; i < 4; i += 1) {
    for (let j = 0; j < 5; j += 1) {
      const coord = [i, j];
      const id = coord.toString().replace(',', '');
      gameBoard.push({ coord, id });
    }
  }

  for (const tile of gameBoard) {
    boardElement.innerHTML +=
      /* HTML */
      `<div data-tile="${tile.id}" class="board__tile">
        <img src="${floorImage2}" class="tileImg" width="64" height="64" />
        <img
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.org/2000/svg'%3E%3C/svg%3E"
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

  tileImageElement.src = floorImage1;
  playerImageElement.src = playerDownImage;

  document.addEventListener('keyup', handleMovement);
};

startGameButton?.addEventListener('click', initGameBoard);
