export interface Position {
  coord: number[];
  id: string;
  danger: string | null;
}

export interface GlobalVariables {
  isGameStarted: boolean;
  currentPosition: number;
  previousPosition: number;
  score: number;
}

export interface Images {
  [key: string]: string;
}

export interface Locales {
  [key: string]: {
    [key: string]: string;
  };
}

export interface Scores {
  step: number;
  bat: number;
  arrow: number;
  wumpus: number;
  hole: number;
}

export interface LeaderboardItem {
  name: string;
  score: number;
}
