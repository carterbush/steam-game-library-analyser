import { Injectable } from '@nestjs/common';
import SteamAPI from 'steamapi';

@Injectable()
export class SteamService {
  private steam: SteamAPI;

  constructor() {
    this.steam = new SteamAPI('some_api_key');
  }

  public resolveUsername(username: string): string {
    // todo
    return username;
  }
}
