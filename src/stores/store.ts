import { Images, LeaderboardItem, Locales, Position, Scores } from '@/typings/types';

export const boardElement = document.querySelector('.board') as HTMLElement;

export const modalElement = document.querySelector('.loose-dialog') as HTMLElement;

export const controlsElement = document.querySelector('.controls') as HTMLElement;

export const leaderboardElement = document.querySelector('.leaderboard') as HTMLElement;

export const informationElement = document.querySelector('.information') as HTMLElement;

export const startGameButton = document.querySelector('#startGameButton') as HTMLButtonElement;

export const showControlsButton = document.querySelector('#showControls') as HTMLButtonElement;

export const winModal = document.querySelector('.win-dialog') as HTMLElement;
export const winDialogScore = winModal.querySelector('#winDialogScore') as HTMLParagraphElement;

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

export const leaderboard: LeaderboardItem[] = [];

export const images: Images = {
  floor1: 'https://imagedelivery.net/3ecvmLCFkS-FijMWb0qFvQ/03636863-5fb8-41a2-8100-2344d9d54000/w=64',
  floor2: 'https://imagedelivery.net/3ecvmLCFkS-FijMWb0qFvQ/36d9ffad-8037-4d4d-93a8-bd0d7913f000/w=64',
  hole: 'https://imagedelivery.net/3ecvmLCFkS-FijMWb0qFvQ/7431f917-b3e8-4289-6493-53f649fecb00/w=64',
  playerDown: 'https://imagedelivery.net/3ecvmLCFkS-FijMWb0qFvQ/0b24041e-d2eb-41d1-d651-313b4739d500/w=32',
  playerRight: 'https://imagedelivery.net/3ecvmLCFkS-FijMWb0qFvQ/deff91a6-3dc7-4705-8a2d-97fc4da2ea00/w=32',
  playerLeft: 'https://imagedelivery.net/3ecvmLCFkS-FijMWb0qFvQ/6734475c-874a-4177-5b4f-8c28630f3800/w=32',
  playerUp: 'https://imagedelivery.net/3ecvmLCFkS-FijMWb0qFvQ/03d72ec3-be44-4851-1888-f19cadde4100/w=32',
  coin: 'https://imagedelivery.net/3ecvmLCFkS-FijMWb0qFvQ/68a479b0-388d-42df-c370-31cbb4c5fe00/w=16',
  arrow: 'https://imagedelivery.net/3ecvmLCFkS-FijMWb0qFvQ/24905c7e-15eb-487e-db64-7cd6ffea9500/w=16',
  wumpus: 'https://imagedelivery.net/3ecvmLCFkS-FijMWb0qFvQ/8970db45-0232-4ae3-034b-748304e64a00/w=32',
  bat: 'https://imagedelivery.net/3ecvmLCFkS-FijMWb0qFvQ/9abedca9-b076-4ea3-52e8-4b569d9ebd00/w=32',
};
