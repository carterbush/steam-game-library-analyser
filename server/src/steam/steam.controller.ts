import { Controller, Get, Param } from '@nestjs/common';
import { Game, PlayerSummary } from 'steamapi';
import { GameDetails } from './models/gameDetails';
import { PlayerOverview } from './models/playerOverview';
import { SteamService } from './steam.service';

@Controller('steam')
export class SteamController {
  constructor(private readonly steamService: SteamService) {}

  @Get('game/:appid/details')
  public getGameDetails(@Param('appid') appId: string): Promise<GameDetails> {
    return this.steamService.getGameDetails(appId);
  }

  @Get('player/:username')
  public getPlayerId(@Param('username') username: string): Promise<string> {
    return this.steamService.resolveUsername(username);
  }

  @Get('player/:userid/games')
  public getPlayerGames(@Param('userid') userId: string): Promise<Game[]> {
    return this.steamService.getPlayerGames(userId);
  }

  @Get('player/:userid/overview')
  public getPlayerOverview(
    @Param('userid') userId: string,
  ): Promise<PlayerOverview> {
    return this.steamService.getPlayerOverview(userId);
  }

  @Get('player/:userid/summary')
  public getPlayerSummary(
    @Param('userid') userId: string,
  ): Promise<PlayerSummary> {
    return this.steamService.getPlayerSummary(userId);
  }
}
