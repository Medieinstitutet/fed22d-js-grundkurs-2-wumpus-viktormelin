import {
  boardElement,
  gameBoard,
  informationElement,
  keyboardKeys,
  leaderboardElement,
  startGameButton,
} from '@/stores/store';
import Global from '@/stores/variables';

const UpdateSteps = () => {
  Global.stepsTaken += 1;
  informationElement.querySelector('.information__score p')!.innerHTML = `Current Score: ${Global.stepsTaken}`;
};

export default UpdateSteps;
