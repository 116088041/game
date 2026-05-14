import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('user')
  async createOrUpdateUser(
    @Body() body: {
      userId: string;
      nickname: string;
      cityCode: string;
      cityName: string;
      provinceCode: string;
      provinceName: string;
      district?: string;
      districtType?: string;
      balance: number;
      karmaValue?: number;
      day: number;
    }
  ) {
    const user = await this.gameService.createOrUpdateUser(body);
    return { code: 200, msg: 'success', data: user };
  }

  @Post('record')
  async recordDailyEvent(
    @Body() body: {
      userId: string;
      day?: number;
      eventTitle: string;
      eventResult: string;
      moneyChange: number;
      karmaChange?: number;
      karmaValue?: number;
      balance: number;
      locationName?: string;
    }
  ) {
    const record = await this.gameService.recordDailyEvent(body);
    return { code: 200, msg: 'success', data: record };
  }

  @Get('ranking')
  async getUserRanking(
    @Query('userId') userId: string,
    @Query('cityCode') cityCode: string,
    @Query('provinceCode') provinceCode: string
  ) {
    const ranking = await this.gameService.getUserRanking(userId, cityCode, provinceCode);
    return { code: 200, msg: 'success', data: ranking };
  }

  @Get('user')
  async getUser(@Query('userId') userId: string) {
    const user = await this.gameService.getUser(userId);
    return { code: 200, msg: 'success', data: user };
  }

  @Get('records')
  async getUserRecords(@Query('userId') userId: string) {
    const records = await this.gameService.getUserRecords(userId);
    return { code: 200, msg: 'success', data: records };
  }

  @Get('rankings/richest')
  async getRichestRankings(
    @Query('cityCode') cityCode?: string,
    @Query('provinceCode') provinceCode?: string
  ) {
    const rankings = await this.gameService.getRichestRankings(cityCode, provinceCode);
    return { code: 200, msg: 'success', data: rankings };
  }

  @Get('rankings/expense')
  async getExpenseRankings(@Query('userId') userId: string, @Query('limit') limit?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : 100;
    const rankings = await this.gameService.getExpenseRankings(parsedLimit);
    const myRank = await this.gameService.getUserExpenseRank(userId);
    return { code: 200, msg: 'success', data: { rankings, myRank: myRank.rank, myTotal: myRank.total } };
  }

  @Get('rankings/income')
  async getIncomeRankings(@Query('userId') userId: string, @Query('limit') limit?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : 100;
    const rankings = await this.gameService.getIncomeRankings(parsedLimit);
    const myRank = await this.gameService.getUserIncomeRank(userId);
    return { code: 200, msg: 'success', data: { rankings, myRank: myRank.rank, myTotal: myRank.total } };
  }

  @Post('rankings/summary')
  async summaryRankings() {
    const result = await this.gameService.summaryAllRankings();
    return { code: 200, msg: 'success', data: result };
  }

  @Post('settle')
  async settleUser(@Body() body: { userId: string }) {
    const result = await this.gameService.settleUser(body.userId);
    return { code: 200, msg: 'success', data: result };
  }
}
