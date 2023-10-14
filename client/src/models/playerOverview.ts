import { Game } from './game';

export interface PlayerOverview {
  totalGames: number;
  totalPlayTime: number;
  mostPlayedGame: Game;
}
