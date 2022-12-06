import { informationElement } from '@/stores/store';
import Global from '@/stores/variables';

const updateScore = (score: number) => {
  Global.score += score;
  const scoreElement = informationElement.querySelector('.information__score p') as HTMLElement;
  scoreElement.innerHTML = `Poäng: ${Global.score}`;
};

export default updateScore;
