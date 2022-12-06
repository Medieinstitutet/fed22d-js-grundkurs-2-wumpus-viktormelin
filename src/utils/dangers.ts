import floorImage1 from '@/assets/floor.png';
import playerDownImage from '@/assets/player_facing_to_down.png';
import { boardElement, gameBoard, scores } from '@/stores/store';
import Global from '@/stores/variables';
import CheckSurroundings from './checkSurroundings';
import updateScore from './updateScore';

const steppedInHole = () => {
  // EndGame('death');
};

const steppedOnBat = () => {
  Global.previousPosition = Global.currentPosition;

  let found = false;

  while (!found) {
    const index = Math.floor(Math.random() * gameBoard.length);
    const holeTile = gameBoard[index];

    if (index !== Global.currentPosition && holeTile.danger === null) {
      Global.currentPosition = index;

      const oldPositionElement = boardElement.querySelector(
        `[data-tile="${gameBoard[Global.previousPosition].id}"]`
      ) as HTMLElement;
      const oldPositionElementImage = oldPositionElement.querySelector('.playerimg') as HTMLImageElement;
      oldPositionElementImage.src =
        "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E";

      const currentPositionElement = boardElement.querySelector(
        `[data-tile="${gameBoard[Global.currentPosition].id}"]`
      ) as HTMLElement;
      const tileImageElement = currentPositionElement.querySelector('.tileimg') as HTMLImageElement;
      const playerImageElement = currentPositionElement.querySelector('.playerimg') as HTMLImageElement;

      playerImageElement.src = playerDownImage;
      tileImageElement.src = floorImage1;

      CheckSurroundings();
      updateScore(scores.bat);

      found = true;
      break;
    }
  }
};

const steppedOnWumpus = () => {
  console.log('Stepped on Wumpus');
};

export default { steppedInHole, steppedOnBat, steppedOnWumpus };
