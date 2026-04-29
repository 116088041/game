import { Injectable } from '@nestjs/common';

// 用户数据接口
export interface UserRecord {
  userId: string;
  nickname: string;
  cityCode: string;
  cityName: string;
  provinceCode: string;
  provinceName: string;
  balance: number;
  day: number;
  updatedAt: Date;
}

// 每日记录接口
export interface DailyRecord {
  userId: string;
  day: number;
  eventTitle: string;
  eventResult: string;
  moneyChange: number;
  balance: number;
  locationName?: string;
  createdAt: Date;
}

// 排名信息接口
export interface RankingInfo {
  cityRank: number;
  cityTotal: number;
  cityRichest: { nickname: string; balance: number } | null;
  provinceRank: number;
  provinceTotal: number;
  provinceRichest: { nickname: string; balance: number } | null;
  nationalRank: number;
  nationalTotal: number;
  nationalRichest: { nickname: string; balance: number } | null;
}

@Injectable()
export class GameService {
  // 模拟数据库 - 用户记录
  private users: Map<string, UserRecord> = new Map();
  
  // 模拟数据库 - 每日记录
  private dailyRecords: DailyRecord[] = [];

  // 创建或更新用户
  async createOrUpdateUser(data: {
    userId: string;
    nickname: string;
    cityCode: string;
    cityName: string;
    provinceCode: string;
    provinceName: string;
    balance: number;
    day: number;
  }): Promise<UserRecord> {
    const existingUser = this.users.get(data.userId);
    
    const userRecord: UserRecord = {
      userId: data.userId,
      nickname: data.nickname,
      cityCode: data.cityCode,
      cityName: data.cityName,
      provinceCode: data.provinceCode,
      provinceName: data.provinceName,
      balance: data.balance,
      day: data.day,
      updatedAt: new Date(),
    };

    this.users.set(data.userId, userRecord);
    return userRecord;
  }

  // 记录每日事件
  async recordDailyEvent(data: {
    userId: string;
    day: number;
    eventTitle: string;
    eventResult: string;
    moneyChange: number;
    balance: number;
    locationName?: string;
  }): Promise<DailyRecord> {
    const record: DailyRecord = {
      userId: data.userId,
      day: data.day,
      eventTitle: data.eventTitle,
      eventResult: data.eventResult,
      moneyChange: data.moneyChange,
      balance: data.balance,
      locationName: data.locationName,
      createdAt: new Date(),
    };

    this.dailyRecords.push(record);
    return record;
  }

  // 获取用户排名
  async getUserRanking(userId: string, cityCode: string, provinceCode: string): Promise<RankingInfo> {
    // 获取所有用户
    const allUsers = Array.from(this.users.values());
    
    // 按城市排名
    const cityUsers = allUsers.filter(u => u.cityCode === cityCode)
      .sort((a, b) => b.balance - a.balance);
    const cityRank = cityUsers.findIndex(u => u.userId === userId) + 1;
    const cityRichest = cityUsers[0] ? { nickname: cityUsers[0].nickname, balance: cityUsers[0].balance } : null;

    // 按省份排名
    const provinceUsers = allUsers.filter(u => u.provinceCode === provinceCode)
      .sort((a, b) => b.balance - a.balance);
    const provinceRank = provinceUsers.findIndex(u => u.userId === userId) + 1;
    const provinceRichest = provinceUsers[0] ? { nickname: provinceUsers[0].nickname, balance: provinceUsers[0].balance } : null;

    // 按全国排名
    const nationalUsers = allUsers.sort((a, b) => b.balance - a.balance);
    const nationalRank = nationalUsers.findIndex(u => u.userId === userId) + 1;
    const nationalRichest = nationalUsers[0] ? { nickname: nationalUsers[0].nickname, balance: nationalUsers[0].balance } : null;

    return {
      cityRank: cityRank || 1,
      cityTotal: cityUsers.length || 1,
      cityRichest,
      provinceRank: provinceRank || 1,
      provinceTotal: provinceUsers.length || 1,
      provinceRichest,
      nationalRank: nationalRank || 1,
      nationalTotal: nationalUsers.length || 1,
      nationalRichest,
    };
  }

  // 获取用户信息
  async getUser(userId: string): Promise<UserRecord | null> {
    return this.users.get(userId) || null;
  }

  // 获取用户所有记录
  async getUserRecords(userId: string): Promise<DailyRecord[]> {
    return this.dailyRecords.filter(r => r.userId === userId);
  }
}
