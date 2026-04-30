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
  totalIncome: number;   // 总收入
  totalExpense: number;  // 总支出
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
  // 花钱排行榜
  expenseRank: number;
  expenseTotal: number;
  topSpender: { nickname: string; totalExpense: number } | null;
  // 赚钱排行榜
  incomeRank: number;
  incomeTotal: number;
  topEarner: { nickname: string; totalIncome: number } | null;
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
    totalIncome?: number;
    totalExpense?: number;
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
      totalIncome: data.totalIncome || 0,
      totalExpense: data.totalExpense || 0,
      day: data.day,
      updatedAt: new Date(),
    };

    this.users.set(data.userId, userRecord);
    return userRecord;
  }

  // 记录每日事件
  async recordDailyEvent(data: {
    userId: string;
    day?: number;
    eventTitle: string;
    eventResult: string;
    moneyChange: number;
    balance: number;
    locationName?: string;
  }): Promise<DailyRecord> {
    const record: DailyRecord = {
      userId: data.userId,
      day: data.day || 1,
      eventTitle: data.eventTitle,
      eventResult: data.eventResult,
      moneyChange: data.moneyChange,
      balance: data.balance,
      locationName: data.locationName,
      createdAt: new Date(),
    };

    this.dailyRecords.push(record);

    // 更新用户的totalIncome和totalExpense
    const user = this.users.get(data.userId);
    if (user) {
      if (data.moneyChange > 0) {
        user.totalIncome = (user.totalIncome || 0) + data.moneyChange;
      } else if (data.moneyChange < 0) {
        user.totalExpense = (user.totalExpense || 0) + Math.abs(data.moneyChange);
      }
    }

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

  // 获取所有城市排行榜
  async getCityRankings(cityCode: string): Promise<any[]> {
    const allUsers = Array.from(this.users.values());
    const cityUsers = allUsers
      .filter(u => u.cityCode === cityCode)
      .sort((a, b) => b.balance - a.balance)
      .slice(0, 100);

    return cityUsers.map((u, index) => ({
      userId: u.userId,
      nickname: u.nickname,
      balance: u.balance,
      day: u.day,
      city: u.cityName,
      province: u.provinceName,
      rank: index + 1,
      rankType: 'city' as const,
    }));
  }

  // 获取所有省份排行榜
  async getProvinceRankings(provinceCode: string): Promise<any[]> {
    const allUsers = Array.from(this.users.values());
    const provinceUsers = allUsers
      .filter(u => u.provinceCode === provinceCode)
      .sort((a, b) => b.balance - a.balance)
      .slice(0, 100);

    return provinceUsers.map((u, index) => ({
      userId: u.userId,
      nickname: u.nickname,
      balance: u.balance,
      day: u.day,
      city: u.cityName,
      province: u.provinceName,
      rank: index + 1,
      rankType: 'province' as const,
    }));
  }

  // 获取全国排行榜
  async getNationalRankings(): Promise<any[]> {
    const allUsers = Array.from(this.users.values());
    const sortedUsers = allUsers
      .sort((a, b) => b.balance - a.balance)
      .slice(0, 100);

    return sortedUsers.map((u, index) => ({
      userId: u.userId,
      nickname: u.nickname,
      balance: u.balance,
      day: u.day,
      city: u.cityName,
      province: u.provinceName,
      rank: index + 1,
      rankType: 'national' as const,
    }));
  }

  // 汇总所有排行榜数据
  async summaryAllRankings(): Promise<{
    totalUsers: number;
    totalMoney: number;
    avgBalance: number;
    richestUser: { nickname: string; balance: number } | null;
    cityCount: number;
    provinceCount: number;
  }> {
    const allUsers = Array.from(this.users.values());
    const totalUsers = allUsers.length;
    const totalMoney = allUsers.reduce((sum, u) => sum + u.balance, 0);
    const avgBalance = totalUsers > 0 ? Math.round(totalMoney / totalUsers) : 0;
    
    // 找出最富有的用户
    const sortedUsers = allUsers.sort((a, b) => b.balance - a.balance);
    const richestUser = sortedUsers.length > 0 
      ? { nickname: sortedUsers[0].nickname, balance: sortedUsers[0].balance }
      : null;
    
    // 统计城市和省份数量
    const citySet = new Set(allUsers.map(u => u.cityCode));
    const provinceSet = new Set(allUsers.map(u => u.provinceCode));

    return {
      totalUsers,
      totalMoney,
      avgBalance,
      richestUser,
      cityCount: citySet.size,
      provinceCount: provinceSet.size,
    };
  }

  // 获取花钱排行榜（按总支出排序）
  async getExpenseRankings(limit: number = 100): Promise<any[]> {
    const allUsers = Array.from(this.users.values());
    const sortedUsers = allUsers
      .filter(u => u.totalExpense > 0)
      .sort((a, b) => b.totalExpense - a.totalExpense)
      .slice(0, limit);

    return sortedUsers.map((u, index) => ({
      userId: u.userId,
      nickname: u.nickname,
      totalExpense: u.totalExpense,
      currentBalance: u.balance,
      day: u.day,
      city: u.cityName,
      province: u.provinceName,
      rank: index + 1,
    }));
  }

  // 获取赚钱排行榜（按总收入排序）
  async getIncomeRankings(limit: number = 100): Promise<any[]> {
    const allUsers = Array.from(this.users.values());
    const sortedUsers = allUsers
      .filter(u => u.totalIncome > 0)
      .sort((a, b) => b.totalIncome - a.totalIncome)
      .slice(0, limit);

    return sortedUsers.map((u, index) => ({
      userId: u.userId,
      nickname: u.nickname,
      totalIncome: u.totalIncome,
      currentBalance: u.balance,
      day: u.day,
      city: u.cityName,
      province: u.provinceName,
      rank: index + 1,
    }));
  }

  // 获取用户在花钱排行榜的排名
  async getUserExpenseRank(userId: string): Promise<{ rank: number; total: number }> {
    const allUsers = Array.from(this.users.values());
    const filteredUsers = allUsers.filter(u => u.totalExpense > 0);
    const sortedUsers = filteredUsers.sort((a, b) => b.totalExpense - a.totalExpense);
    const userIndex = sortedUsers.findIndex(u => u.userId === userId);
    
    return {
      rank: userIndex >= 0 ? userIndex + 1 : sortedUsers.length + 1,
      total: sortedUsers.length,
    };
  }

  // 获取用户在赚钱排行榜的排名
  async getUserIncomeRank(userId: string): Promise<{ rank: number; total: number }> {
    const allUsers = Array.from(this.users.values());
    const filteredUsers = allUsers.filter(u => u.totalIncome > 0);
    const sortedUsers = filteredUsers.sort((a, b) => b.totalIncome - a.totalIncome);
    const userIndex = sortedUsers.findIndex(u => u.userId === userId);
    
    return {
      rank: userIndex >= 0 ? userIndex + 1 : sortedUsers.length + 1,
      total: sortedUsers.length,
    };
  }
}
