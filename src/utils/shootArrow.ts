import { gameBoard } from '@/stores/store';
import Global from '@/stores/variables';

const shootArrow = (direction: string) => {
  const { coord } = gameBoard[Global.currentPosition];
  const closestCoords = [];
  const coordsToFind = [];
  const travelTiles = 3;

  switch (direction) {
    case 'left':
      for (let i = 1; i < 4; i += 1) {
        if (coord[1] - i >= 0) {
          coordsToFind.push(gameBoard.find((item) => item.coord[0] === coord[0] && item.coord[1] === i));
        } else {
          coordsToFind.push(gameBoard.find((item) => item.coord[0] === coord[0] && item.coord[1] === i));
        }
      }

      break;
    case 'right':
      break;
    case 'up':
      break;
    case 'down':
      break;
    default:
      break;
  }
};

export default shootArrow;
