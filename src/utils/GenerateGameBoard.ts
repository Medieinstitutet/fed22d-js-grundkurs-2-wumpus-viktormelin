import { gameBoard } from '@/stores/store';
import Global from '@/stores/variables';

const GenerateGameBoard = () => {
  const gridSize = [4, 5];
  const percentageHoles = 0.1;
  const percentageBats = 0.2;

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
    // const wumpusTile = gameBoard[index];
    if (index !== Global.currentPosition) {
      wumpus = true;
      gameBoard[index].danger = 'wumpus';
      break;
    }
  }

  while (holes < gridSize[0] * gridSize[1] * percentageHoles) {
    const index = Math.floor(Math.random() * gameBoard.length);
    const holeTile = gameBoard[index];
    if (index !== Global.currentPosition && holeTile.danger === null) {
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
    if (index !== Global.currentPosition && holeTile.danger === null) {
      bats += 1;
      gameBoard[index].danger = 'bat';

      if (bats >= (gridSize[0] * gridSize[1]) / percentageHoles) {
        break;
      }
    }
  }
};

export default GenerateGameBoard;
