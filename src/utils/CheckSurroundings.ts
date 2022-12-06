import { boardElement, gameBoard, informationElement, locales } from '@/stores/store';
import Global from '@/stores/variables';

const checkSurroundings = () => {
  const helperElement = informationElement.querySelector('.information__helper') as HTMLElement;
  helperElement.innerHTML = '';

  const { coord } = gameBoard[Global.currentPosition];
  const closestCoords = [];

  const closestSCoord = coord[0] + 1 <= 3 ? coord[0] + 1 : 0;
  closestCoords.push(gameBoard.find((item) => item.coord[0] === closestSCoord && item.coord[1] === coord[1]));

  const closestNCoord = coord[0] - 1 >= 0 ? coord[0] - 1 : 3;
  closestCoords.push(gameBoard.find((item) => item.coord[0] === closestNCoord && item.coord[1] === coord[1]));

  const closestWCoord = coord[1] - 1 >= 0 ? coord[1] - 1 : 4;
  closestCoords.push(gameBoard.find((item) => item.coord[0] === coord[0] && item.coord[1] === closestWCoord));

  const closestECoord = coord[1] + 1 <= 4 ? coord[1] + 1 : 0;
  closestCoords.push(gameBoard.find((item) => item.coord[0] === coord[0] && item.coord[1] === closestECoord));

  for (const item of closestCoords) {
    if (Global.isDebug) {
      const el = boardElement.querySelector(`[data-tile="${item?.id}"]`);
      el?.classList.toggle('debug');
    }

    if (item?.danger) {
      helperElement.innerHTML += `<p>${locales[item.danger]}</p>`;
    }
  }
};

export default checkSurroundings;
