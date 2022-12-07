import handleMovement from '@/utils/handleMovement';

const arrowHitManager = () => {
  document.addEventListener('keyup', handleMovement);
};

export default arrowHitManager;
