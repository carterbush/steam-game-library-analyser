import { Controller, Get, Param } from '@nestjs/common';
import { SteamService } from './steam.service';

@Controller('steam')
export class SteamController {
  constructor(private readonly steamService: SteamService) {}

  @Get('player/:username')
  public getPlayerId(@Param('username') username): Promise<string> {
    return this.steamService.resolveUsername(username);
  }
}
