export interface Hamster {
  name: string;
  age: number;
  defeats: number;
  wins: number;
  games: number;
  favFood: string;
  id: string;
  loves: string;
  imgName: string;
  className: string;
}

export interface Matches {
  winnerId: string;
  loserId: string;
  time: number;
  id: string;
  date: null | string;
}
