import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SteamModule } from './steam/steam.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SteamModule,
  ],
})
export class AppModule {}
