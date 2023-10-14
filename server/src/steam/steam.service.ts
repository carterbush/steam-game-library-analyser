import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SteamAPI, { Game } from 'steamapi';

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

  public async resolveUsername(username: string): Promise<string> {
    return this.steam.resolve(`https://steamcommunity.com/id/${username}`);
  }
}
