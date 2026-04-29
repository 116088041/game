import { Controller, Post, Body } from '@nestjs/common';
import { VideoGenerationClient, Config } from 'coze-coding-dev-sdk';

@Controller('video')
export class VideoController {
  @Post('generate-walker')
  async generateWalkerVideo() {
    const config = new Config();
    const client = new VideoGenerationClient(config);

    // 街溜子行走的视频提示词
    const prompt = `A young Chinese man walking casually down a bustling city street, wearing casual clothes like a hoodie and loose pants, hands in pockets, swaggering leisurely, looking around casually. Both sides of the street are lined with shops, restaurants, and modern buildings with Chinese characteristics. Street lights, trees along the sidewalk, other pedestrians in the background. The man walks confidently from left to right across the camera view. Daytime urban street scene, realistic style, cinematic camera follows the walking man, natural movement, relaxed atmosphere.`;

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
