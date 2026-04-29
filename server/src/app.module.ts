import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { GameModule } from '@/game/game.module';
import { VideoModule } from '@/video/video.module';

@Module({
  imports: [GameModule, VideoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
