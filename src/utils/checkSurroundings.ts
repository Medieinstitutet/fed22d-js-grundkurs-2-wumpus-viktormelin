import { boardElement, gameBoard, informationHelperElement, locales } from '@/stores/store';
import Global from '@/stores/variables';

const checkSurroundings = () => {
  informationHelperElement.innerHTML = '';

  const { coord } = gameBoard[Global.currentPosition];
  const closestCoords = [];

  /* 
    Find closest coords to south, north, west, east of the player
    and add the gameboard tile of that position to array
  */

  const closestSCoord = coord[0] + 1 <= 3 ? coord[0] + 1 : 0;
  closestCoords.push(gameBoard.find((item) => item.coord[0] === closestSCoord && item.coord[1] === coord[1]));

  const closestNCoord = coord[0] - 1 >= 0 ? coord[0] - 1 : 3;
  closestCoords.push(gameBoard.find((item) => item.coord[0] === closestNCoord && item.coord[1] === coord[1]));

  const closestWCoord = coord[1] - 1 >= 0 ? coord[1] - 1 : 4;
  closestCoords.push(gameBoard.find((item) => item.coord[0] === coord[0] && item.coord[1] === closestWCoord));

  const closestECoord = coord[1] + 1 <= 4 ? coord[1] + 1 : 0;
  closestCoords.push(gameBoard.find((item) => item.coord[0] === coord[0] && item.coord[1] === closestECoord));

  /* 
    Loop through closest positions and check for danger on tile
    If danger, add text to game information
  */

  for (const item of closestCoords) {
    if (Global.isDebug) {
      const el = boardElement.querySelector(`[data-tile="${item?.id}"]`);
      el?.classList.toggle('debug');
    }

    if (item?.danger) {
      informationHelperElement.innerHTML += `<p>${locales.dangers[item.danger]}</p>`;
    }
  }
};

export default checkSurroundings;
