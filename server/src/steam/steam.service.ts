import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SteamAPI from 'steamapi';

@Injectable()
export class SteamService {
  private steam: SteamAPI;

  constructor(private readonly configService: ConfigService) {
    const steamApiKey = configService.get<string>('STEAM_API_KEY');
    this.steam = new SteamAPI(steamApiKey);
  }

  public resolveUsername(username: string): string {
    // todo
    return username;
  }
}
