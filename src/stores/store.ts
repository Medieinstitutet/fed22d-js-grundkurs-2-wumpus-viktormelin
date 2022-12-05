import { GlobalVariables, Position } from '@/typings/types';

export const boardElement = document.querySelector('.board') as HTMLElement;
export const leaderboardElement = document.querySelector('.leaderboard') as HTMLElement;
export const startGameButton = document.querySelector('#startGameButton') as HTMLButtonElement;
export const keyboardKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter'];
export const gameBoard: Position[] = [];
