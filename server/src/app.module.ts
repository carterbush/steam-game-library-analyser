import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SteamModule } from './steam/steam.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SteamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
