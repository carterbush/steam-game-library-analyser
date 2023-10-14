import { Controller, Get } from '@nestjs/common';
import { SteamService } from './steam.service';

@Controller()
export class SteamController {
  constructor(private readonly steamService: SteamService) {}

  @Get()
  getUserId(username: string): string {
    return this.steamService.resolveUsername(username);
  }
}
