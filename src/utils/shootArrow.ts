import { gameBoard } from '@/stores/store';
import Global from '@/stores/variables';
import endGame from './endGame';

const shootArrow = (direction: string) => {
  const { coord } = gameBoard[Global.currentPosition];
  const coordsToFind = [];

  switch (direction) {
    case 'left':
      for (let i = 0; i < 3; i += 1) {
        const closestWCoord = coord[1] - 1 >= 0 ? coord[1] - 1 : 4;
        if (closestWCoord - i >= 0) {
          coordsToFind.push(
            gameBoard.find((item) => item.coord[0] === coord[0] && item.coord[1] === closestWCoord - i)
          );
        } else {
          const movement = closestWCoord - (i - 1) - 4 * -1;
          coordsToFind.push(gameBoard.find((item) => item.coord[0] === coord[0] && item.coord[1] === movement));
        }
      }
      break;
    case 'right':
      for (let i = 0; i < 3; i += 1) {
        const closestECoord = coord[1] + 1 <= 4 ? coord[1] + 1 : 0;

        if (closestECoord + i <= 4) {
          coordsToFind.push(
            gameBoard.find((item) => item.coord[0] === coord[0] && item.coord[1] === closestECoord + i)
          );
        } else {
          let movement = closestECoord - (i + 1);

          movement = movement === 0 ? movement : movement - 1;
          movement = movement >= 0 ? movement : movement * -1;

          coordsToFind.push(gameBoard.find((item) => item.coord[0] === coord[0] && item.coord[1] === movement));
        }
      }
      break;
    case 'up':
      for (let i = 0; i < 3; i += 1) {
        const closestNCoord = coord[0] - 1 >= 0 ? coord[0] - 1 : 3;

        if (closestNCoord - i >= 0) {
          coordsToFind.push(
            gameBoard.find((item) => item.coord[0] === closestNCoord - i && item.coord[1] === coord[1])
          );
        } else {
          const movement = closestNCoord - (i - 1) - 3 * -1;
          coordsToFind.push(gameBoard.find((item) => item.coord[0] === movement && item.coord[1] === coord[1]));
        }
      }
      break;
    case 'down':
      for (let i = 0; i < 3; i += 1) {
        const closestSCoord = coord[0] + 1 <= 3 ? coord[0] + 1 : 0;

        if (closestSCoord + i <= 3) {
          coordsToFind.push(
            gameBoard.find((item) => item.coord[0] === closestSCoord + i && item.coord[1] === coord[1])
          );
        } else {
          let movement = closestSCoord - (i + 1);

          movement = movement === -1 ? 0 : movement;
          coordsToFind.push(gameBoard.find((item) => item.coord[0] === movement && item.coord[1] === coord[1]));
        }
      }
      break;
    default:
      break;
  }

  Global.isArrowMode = false;

  for (const tile of coordsToFind) {
    if (tile?.danger === 'wumpus') {
      endGame('win');
    }
  }
};

export default shootArrow;
