import { Locales, Position, Scores } from '@/typings/types';

export const boardElement = document.querySelector('.board') as HTMLElement;

export const modalElement = document.querySelector('.modal') as HTMLElement;

export const controlsElement = document.querySelector('.controls') as HTMLElement;

export const leaderboardElement = document.querySelector('.leaderboard') as HTMLElement;

export const informationElement = document.querySelector('.information') as HTMLElement;

export const startGameButton = document.querySelector('#startGameButton') as HTMLButtonElement;

export const showControlsButton = document.querySelector('#showControls') as HTMLButtonElement;

export const keyboardKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter'];

export const gameBoard: Position[] = [];

export const locales: Locales = {
  bat: 'Du hör nånting fladdra',
  hole: 'Du känner ett vinddrag',
  wumpus: 'Du känner en konstig lukt',
};

export const scores: Scores = {
  step: 1,
  bat: 2,
  arrow: 3,
  wumpus: 10,
  hole: 5,
};
