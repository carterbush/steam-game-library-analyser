import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import _ from 'lodash';
import SteamAPI, { Game, PlayerSummary } from 'steamapi';
import { GameDetails } from './models/gameDetails';
import { PlayerOverview } from './models/playerOverview';

@Injectable()
export class SteamService {
  private steam: SteamAPI;

  constructor(private readonly configService: ConfigService) {
    const steamApiKey = this.configService.get<string>('STEAM_API_KEY');
    this.steam = new SteamAPI(steamApiKey);
  }

  public async getGameDetails(appId: string): Promise<GameDetails> {
    try {
      return await this.steam.getGameDetails(appId);
    } catch {
      return Promise.resolve({});
    }
  }

  public async getPlayerGames(userId: string): Promise<Game[]> {
    try {
      return await this.steam.getUserOwnedGames(userId);
    } catch {
      return Promise.resolve([]);
    }
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
    try {
      return await this.steam.getUserSummary(userId);
    } catch {
      return Promise.resolve(null);
    }
  }

  public async resolveUsername(username: string): Promise<string> {
    try {
      return await this.steam.resolve(
        `https://steamcommunity.com/id/${username}`,
      );
    } catch {
      return Promise.resolve(null);
    }
  }
}
