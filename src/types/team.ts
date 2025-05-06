export interface Team {
  id: string;
  name: string;
  logo: string;
  games: number;
  wins: number;
  draws: number;
  loses: number;
  scored: number;
  conceded: number;
  points: number;
  form: string[];
  group: string;
}
