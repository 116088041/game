import { Controller, Post, Body } from '@nestjs/common';
import { VideoGenerationClient, Config } from 'coze-coding-dev-sdk';

@Controller('video')
export class VideoController {
  @Post('generate-walker')
  async generateWalkerVideo() {
    const config = new Config();
    const client = new VideoGenerationClient(config);

    // 一个人走在大街上，周围有建筑和树木
    const prompt = `A solitary person walking leisurely along a peaceful urban street lined with tall buildings on both sides, with green trees and bushes planted along the sidewalk. The street has modern architecture mixed with traditional Chinese-style shops. Trees casting gentle shadows on the ground. The person is walking casually, enjoying the urban scenery. Warm afternoon sunlight, realistic style, cinematic camera at eye level following the walker, peaceful and relaxing atmosphere.`;

    try {
      const response = await client.videoGeneration(
        [{ type: 'text', text: prompt }],
        {
          model: 'doubao-seedance-1-5-pro-251215',
          duration: 8,
          ratio: '16:9',
          resolution: '720p',
          generateAudio: false,
          watermark: false,
        }
      );

      return {
        code: 200,
        msg: 'success',
        data: {
          videoUrl: response.videoUrl,
          status: response.response.status,
        },
      };
    } catch (error) {
      console.error('Video generation error:', error);
      return {
        code: 500,
        msg: 'Video generation failed',
        data: null,
      };
    }
  }
}
