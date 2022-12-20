import { gameBoard, keyboardKeys } from '@/stores/store';
import Global from '@/stores/variables';
import updatePlayerPosition from '@/utils/updatePlayerPosition';
import shootArrow from './shootArrow';

const activateArrowMode = () => {
  if (!Global.isArrowMode && Global.arrows > 0) {
    Global.isArrowMode = true;
  }
};

const handleMovement = (e: KeyboardEvent) => {
  if (keyboardKeys.includes(e.key) && Global.isGameStarted) {
    const oldCoords = gameBoard[Global.currentPosition].coord;

    Global.previousPosition = Global.currentPosition;

    switch (e.key) {
      case 'ArrowLeft':
        if (!Global.isArrowMode) {
          if (oldCoords[1] === 0) {
            Global.currentPosition = gameBoard.findIndex(
              (item) => item.coord[1] === 4 && item.coord[0] === oldCoords[0]
            );
            // gameBoard[currentPosition].coord[1] = 4;
          } else {
            Global.currentPosition = gameBoard.findIndex(
              (item) => item.coord[1] === oldCoords[1] - 1 && item.coord[0] === oldCoords[0]
            );
            // gameBoard[currentPosition].coord[1] -= 1;
          }

          // gameBoard[currentPosition].id = gameBoard[currentPosition].coord.toString().replace(',', '');
          updatePlayerPosition('left');
        } else {
          shootArrow('left');
        }

        break;
      case 'ArrowRight':
        if (!Global.isArrowMode) {
          if (oldCoords[1] === 4) {
            Global.currentPosition = gameBoard.findIndex(
              (item) => item.coord[1] === 0 && item.coord[0] === oldCoords[0]
            );
            // currentPosition.coord[1] = 0;
          } else {
            Global.currentPosition = gameBoard.findIndex(
              (item) => item.coord[1] === oldCoords[1] + 1 && item.coord[0] === oldCoords[0]
            );
            // currentPosition.coord[1] += 1;
          }

          // currentPosition.id = currentPosition.coord.toString().replace(',', '');
          updatePlayerPosition('right');
        } else {
          shootArrow('right');
        }

        break;
      case 'ArrowUp':
        if (!Global.isArrowMode) {
          if (oldCoords[0] === 0) {
            Global.currentPosition = gameBoard.findIndex(
              (item) => item.coord[1] === oldCoords[1] && item.coord[0] === 3
            );
            // currentPosition.coord[0] = 3;
          } else {
            Global.currentPosition = gameBoard.findIndex(
              (item) => item.coord[1] === oldCoords[1] && item.coord[0] === oldCoords[0] - 1
            );
            // currentPosition.coord[0] -= 1;
          }

          // currentPosition.id = currentPosition.coord.toString().replace(',', '');
          updatePlayerPosition('up');
        } else {
          shootArrow('up');
        }

        break;
      case 'ArrowDown':
        if (!Global.isArrowMode) {
          if (oldCoords[0] === 3) {
            Global.currentPosition = gameBoard.findIndex(
              (item) => item.coord[1] === oldCoords[1] && item.coord[0] === 0
            );
            // currentPosition.coord[0] = 0;
          } else {
            Global.currentPosition = gameBoard.findIndex(
              (item) => item.coord[1] === oldCoords[1] && item.coord[0] === oldCoords[0] + 1
            );
            // currentPosition.coord[0] += 1;
          }

          // currentPosition.id = currentPosition.coord.toString().replace(',', '');
          updatePlayerPosition('down');
        } else {
          shootArrow('down');
        }

        break;
      case 'Enter':
        activateArrowMode();
        break;
      default:
        break;
    }
  }
};

export default handleMovement;
