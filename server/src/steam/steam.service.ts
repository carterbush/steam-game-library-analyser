import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import _ from 'lodash';
import SteamAPI, { Game, PlayerSummary } from 'steamapi';
import { PlayerOverview } from './models/playerOverview';

@Injectable()
export class SteamService {
  private steam: SteamAPI;

  constructor(private readonly configService: ConfigService) {
    const steamApiKey = this.configService.get<string>('STEAM_API_KEY');
    this.steam = new SteamAPI(steamApiKey);
  }

  public async getPlayerGames(userId: string): Promise<Game[]> {
    return this.steam.getUserOwnedGames(userId);
  }

  public async getPlayerOverview(userId: string): Promise<PlayerOverview> {
    const games = await this.getPlayerGames(userId);

    return {
      totalGames: games.length,
      totalPlayTime: _.sum(games.map((g) => g.playTime)),
      mostPlayedGame: _.maxBy(games, (g) => g.playTime),
    };
  }

  public async getPlayerSummary(userId: string): Promise<PlayerSummary> {
    return this.steam.getUserSummary(userId);
  }

  public async resolveUsername(username: string): Promise<string> {
    return this.steam.resolve(`https://steamcommunity.com/id/${username}`);
  }
}
