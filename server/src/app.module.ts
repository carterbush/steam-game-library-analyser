import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SteamModule } from './steam/steam.module';

@Module({
  imports: [SteamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
