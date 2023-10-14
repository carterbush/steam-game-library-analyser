import { Controller, Get, Param } from '@nestjs/common';
import { SteamService } from './steam.service';
import { Game } from 'steamapi';

@Controller('steam')
export class SteamController {
  constructor(private readonly steamService: SteamService) {}

  @Get('player/:username')
  public getPlayerId(@Param('username') username): Promise<string> {
    return this.steamService.resolveUsername(username);
  }

  @Get('player/:userid/games')
  public getPlayerGames(@Param('userid') userId: string): Promise<Game[]> {
    return this.steamService.getPlayerGames(userId);
  }
}
