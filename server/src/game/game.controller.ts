import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { GameService, RankingInfo } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  /**
   * 创建或更新用户
   */
  @Post('user')
  async createOrUpdateUser(
    @Body() body: {
      userId: string;
      nickname: string;
      cityCode: string;
      cityName: string;
      provinceCode: string;
      provinceName: string;
      balance: number;
      day: number;
    }
  ) {
    console.log('[Game] POST /api/game/user - 创建/更新用户:', {
      url: '/api/game/user',
      method: 'POST',
      params: body
    });
    
    const user = await this.gameService.createOrUpdateUser(body);
    
    console.log('[Game] POST /api/game/user - 响应:', {
      code: 200,
      data: user
    });
    
    return {
      code: 200,
      msg: 'success',
      data: user,
    };
  }

  /**
   * 记录每日事件
   */
  @Post('record')
  async recordDailyEvent(
    @Body() body: {
      userId: string;
      day?: number;
      eventTitle: string;
      eventResult: string;
      moneyChange: number;
      balance: number;
      locationName?: string;
    }
  ) {
    console.log('[Game] POST /api/game/record - 记录事件:', {
      url: '/api/game/record',
      method: 'POST',
      params: body
    });
    
    const record = await this.gameService.recordDailyEvent(body);
    
    console.log('[Game] POST /api/game/record - 响应:', {
      code: 200,
      data: record
    });
    
    return {
      code: 200,
      msg: 'success',
      data: record,
    };
  }

  /**
   * 获取用户排名
   */
  @Get('ranking')
  async getUserRanking(
    @Query('userId') userId: string,
    @Query('cityCode') cityCode: string,
    @Query('provinceCode') provinceCode: string
  ) {
    console.log('[Game] GET /api/game/ranking - 获取排名:', {
      url: '/api/game/ranking',
      method: 'GET',
      params: { userId, cityCode, provinceCode }
    });
    
    const ranking = await this.gameService.getUserRanking(userId, cityCode, provinceCode);
    
    console.log('[Game] GET /api/game/ranking - 响应:', {
      code: 200,
      data: ranking
    });
    
    return {
      code: 200,
      msg: 'success',
      data: ranking,
    };
  }

  /**
   * 获取用户信息
   */
  @Get('user')
  async getUser(@Query('userId') userId: string) {
    console.log('[Game] GET /api/game/user - 获取用户:', {
      url: '/api/game/user',
      method: 'GET',
      params: { userId }
    });
    
    const user = await this.gameService.getUser(userId);
    
    console.log('[Game] GET /api/game/user - 响应:', {
      code: 200,
      data: user
    });
    
    return {
      code: 200,
      msg: 'success',
      data: user,
    };
  }

  /**
   * 获取用户所有记录
   */
  @Get('records')
  async getUserRecords(@Query('userId') userId: string) {
    console.log('[Game] GET /api/game/records - 获取记录:', {
      url: '/api/game/records',
      method: 'GET',
      params: { userId }
    });
    
    const records = await this.gameService.getUserRecords(userId);
    
    console.log('[Game] GET /api/game/records - 响应:', {
      code: 200,
      data: records
    });
    
    return {
      code: 200,
      msg: 'success',
      data: records,
    };
  }

  /**
   * 汇总排行榜数据
   * 汇总所有用户的数据到排行榜
   */
  @Post('rankings/summary')
  async summaryRankings() {
    console.log('[Game] POST /api/game/rankings/summary - 汇总排行榜:', {
      url: '/api/game/rankings/summary',
      method: 'POST'
    });
    
    const result = await this.gameService.summaryAllRankings();
    
    console.log('[Game] POST /api/game/rankings/summary - 响应:', {
      code: 200,
      data: result
    });
    
    return {
      code: 200,
      msg: 'success',
      data: result,
    };
  }

  // 获取花钱排行榜
  @Get('rankings/expense')
  async getExpenseRankings(@Query('userId') userId: string, @Query('limit') limit?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : 100;
    const rankings = await this.gameService.getExpenseRankings(parsedLimit);
    
    // 获取用户自己的排名
    const myRank = await this.gameService.getUserExpenseRank(userId);
    
    return {
      code: 0,
      message: 'success',
      data: {
        rankings,
        myRank: myRank.rank,
        myTotal: myRank.total,
      },
    };
  }

  // 获取赚钱排行榜
  @Get('rankings/income')
  async getIncomeRankings(@Query('userId') userId: string, @Query('limit') limit?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : 100;
    const rankings = await this.gameService.getIncomeRankings(parsedLimit);
    
    // 获取用户自己的排名
    const myRank = await this.gameService.getUserIncomeRank(userId);
    
    return {
      code: 0,
      message: 'success',
      data: {
        rankings,
        myRank: myRank.rank,
        myTotal: myRank.total,
      },
    };
  }
}
