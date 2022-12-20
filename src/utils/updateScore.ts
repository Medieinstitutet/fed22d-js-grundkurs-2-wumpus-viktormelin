import { informationElement } from '@/stores/store';
import Global from '@/stores/variables';

const updateScore = (score: number) => {
  Global.score += score;

  const information = informationElement.querySelector('.information__score') as HTMLElement;
  const scoreSpanElement = information.querySelector('.information__score_points span') as HTMLSpanElement;

  scoreSpanElement.innerText = String(Global.score);
};

export default updateScore;
