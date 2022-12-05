import { boardElement, gameBoard, keyboardKeys, leaderboardElement, startGameButton } from '@/stores/store';
import Global from '@/stores/variables';

const UpdateSteps = () => {
  const stepsTakenElement = leaderboardElement.querySelector('ul [data-id="0"] span') as HTMLElement;
  Global.stepsTaken += 1;
  stepsTakenElement.innerHTML = String(Global.stepsTaken);
};

export default UpdateSteps;
