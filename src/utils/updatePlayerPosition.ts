// import batImage from '@/assets/bat.png';
// import floorImage1 from '@/assets/floor.png';
// import holeImage from '@/assets/hole.png';
// import playerDownImage from '@/assets/player_facing_to_down.png';
// import playerLeftImage from '@/assets/player_facing_to_left.png';
// import playerRightImage from '@/assets/player_facing_to_right.png';
// import playerUpImage from '@/assets/player_facing_to_up.png';
// import wumpusImage from '@/assets/wumpus.png';
import { boardElement, gameBoard, images, scores } from '@/stores/store';
import Global from '@/stores/variables';
import updateScore from '@/utils/updateScore';

import checkSurroundings from '@/utils/checkSurroundings';
import dangers from '@/utils/dangers';

const updatePlayerPosition = (direction: string) => {
  // Find current tile image and set it to a empty image to not have error show (probably not very good for a11y...)
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
  const dangerImageElement = currentPositionElement.querySelector('.dangerimg') as HTMLImageElement;
  const playerImageElement = currentPositionElement.querySelector('.playerimg') as HTMLImageElement;

  switch (direction) {
    case 'up':
      playerImageElement.src = images.playerUp;
      break;
    case 'down':
      playerImageElement.src = images.playerDown;
      break;
    case 'left':
      playerImageElement.src = images.playerLeft;
      break;
    case 'right':
      playerImageElement.src = images.playerRight;
      break;

    default:
      break;
  }

  if (gameBoard[Global.currentPosition].danger === 'hole') {
    tileImageElement.src = images.hole;
    dangers.steppedInHole();
  } else {
    tileImageElement.src = images.floor1;

    if (gameBoard[Global.currentPosition].danger === 'bat') {
      dangerImageElement.src = images.bat;
      dangers.steppedOnBat();
    } else if (gameBoard[Global.currentPosition].danger === 'wumpus') {
      dangerImageElement.src = images.wumpus;
      dangers.steppedOnWumpus();
    }
  }

  checkSurroundings();
  updateScore(scores.step);
};

export default updatePlayerPosition;
