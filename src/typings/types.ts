export interface Position {
  coord: number[];
  id: string;
  danger: string | null;
}

export interface GlobalVariables {
  isGameStarted: boolean;
  currentPosition: number;
  previousPosition: number;
  stepsTaken: number;
}

export interface Locales {
  [key: string]: string;
}
