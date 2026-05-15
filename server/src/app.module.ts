import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { GameModule } from '@/game/game.module';
import { VideoModule } from '@/video/video.module';
import { DbModule } from '@/db/db.module';

@Module({
  imports: [DbModule, GameModule, VideoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
