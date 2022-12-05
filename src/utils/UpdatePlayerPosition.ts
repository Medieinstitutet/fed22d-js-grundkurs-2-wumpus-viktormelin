import arrowImage from '@/assets/arrow-icon.png';
import batImage from '@/assets/bat.png';
import floorImage1 from '@/assets/floor.png';
import floorImage2 from '@/assets/floor_1.png';
import holeImage from '@/assets/hole.png';
import playerDownImage from '@/assets/player_facing_to_down.png';
import playerLeftImage from '@/assets/player_facing_to_left.png';
import playerRightImage from '@/assets/player_facing_to_right.png';
import playerUpImage from '@/assets/player_facing_to_up.png';
import coinImage from '@/assets/score-icon.png';
import wumpusImage from '@/assets/wumpus.png';
import { boardElement, gameBoard, keyboardKeys, leaderboardElement, startGameButton } from '@/stores/store';
import Global from '@/stores/variables';
import UpdateSteps from '@/utils/UpdateSteps';

import CheckSurroundings from './CheckSurroundings';

const UpdatePlayerPosition = (direction: string) => {
  // Find current tile image and set it to a empty image to not have error show (probably not very good for a11y...)
  const oldPositionElement = boardElement.querySelector(
    `[data-tile="${gameBoard[Global.previousPosition].id}"]`
  ) as HTMLElement;
  const oldPositionElementImage = oldPositionElement.querySelector('.playerimg') as HTMLImageElement;
  oldPositionElementImage.src =
    "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E";

  // currentPositionElement = boardElement.querySelector(`[data-tile="${currentPosition.id}"]`) as HTMLElement;

  const currentPositionElement = boardElement.querySelector(
    `[data-tile="${gameBoard[Global.currentPosition].id}"]`
  ) as HTMLElement;
  const tileImageElement = currentPositionElement.querySelector('.tileimg') as HTMLImageElement;
  const dangerImageElement = currentPositionElement.querySelector('.dangerimg') as HTMLImageElement;
  const playerImageElement = currentPositionElement.querySelector('.playerimg') as HTMLImageElement;

  if (gameBoard[Global.currentPosition].danger === 'hole') {
    tileImageElement.src = holeImage;
  } else {
    tileImageElement.src = floorImage1;

    if (gameBoard[Global.currentPosition].danger === 'bat') {
      dangerImageElement.src = batImage;
    } else if (gameBoard[Global.currentPosition].danger === 'wumpus') {
      dangerImageElement.src = wumpusImage;
    }
  }

  switch (direction) {
    case 'up':
      playerImageElement.src = playerUpImage;
      break;
    case 'down':
      playerImageElement.src = playerDownImage;
      break;
    case 'left':
      playerImageElement.src = playerLeftImage;
      break;
    case 'right':
      playerImageElement.src = playerRightImage;
      break;

    default:
      break;
  }

  CheckSurroundings();
  UpdateSteps();
};

export default UpdatePlayerPosition;
