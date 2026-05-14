import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const DATA_FILE = path.resolve(__dirname, '../../data/game-data.json');

export interface UserRecord {
  userId: string;
  nickname: string;
  cityCode: string;
  cityName: string;
  provinceCode: string;
  provinceName: string;
  district: string;
  districtType: string;
  balance: number;
  totalIncome: number;
  totalExpense: number;
  karmaValue: number;
  day: number;
  lastSettlementDate: string;
  updatedAt: Date;
}

export interface DailyRecord {
  userId: string;
  day: number;
  eventTitle: string;
  eventResult: string;
  moneyChange: number;
  karmaChange: number;
  karmaValue: number;
  balance: number;
  locationName?: string;
  createdAt: Date;
}

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
  expenseRank: number;
  expenseTotal: number;
  incomeRank: number;
  incomeTotal: number;
}

@Injectable()
export class GameService implements OnModuleInit {
  private users: Map<string, UserRecord> = new Map();
  private dailyRecords: DailyRecord[] = [];

  onModuleInit() {
    this.loadFromDisk();
  }

  private saveToDisk() {
    try {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      const data = {
        users: Array.from(this.users.entries()),
        dailyRecords: this.dailyRecords,
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save data:', e);
    }
  }

  private loadFromDisk() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const data = JSON.parse(raw);
        this.users = new Map(data.users || []);
        this.dailyRecords = data.dailyRecords || [];
        console.log(`Loaded ${this.users.size} users and ${this.dailyRecords.length} records from disk`);
      }
    } catch (e) {
      console.error('Failed to load data:', e);
    }
  }

  async createOrUpdateUser(data: {
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
    totalIncome?: number;
    totalExpense?: number;
    day: number;
  }): Promise<UserRecord> {
    const userRecord: UserRecord = {
      userId: data.userId,
      nickname: data.nickname,
      cityCode: data.cityCode,
      cityName: data.cityName,
      provinceCode: data.provinceCode,
      provinceName: data.provinceName,
      district: data.district || '',
      districtType: data.districtType || '',
      balance: data.balance,
      totalIncome: data.totalIncome || 0,
      totalExpense: data.totalExpense || 0,
      karmaValue: data.karmaValue ?? 50,
      day: data.day,
      lastSettlementDate: new Date().toISOString().split('T')[0],
      updatedAt: new Date(),
    };

    this.users.set(data.userId, userRecord);
    this.saveToDisk();
    return userRecord;
  }

  async recordDailyEvent(data: {
    userId: string;
    day?: number;
    eventTitle: string;
    eventResult: string;
    moneyChange: number;
    karmaChange?: number;
    karmaValue?: number;
    balance: number;
    locationName?: string;
  }): Promise<DailyRecord> {
    const record: DailyRecord = {
      userId: data.userId,
      day: data.day || 1,
      eventTitle: data.eventTitle,
      eventResult: data.eventResult,
      moneyChange: data.moneyChange,
      karmaChange: data.karmaChange || 0,
      karmaValue: data.karmaValue ?? 50,
      balance: data.balance,
      locationName: data.locationName,
      createdAt: new Date(),
    };

    this.dailyRecords.push(record);

    let user = this.users.get(data.userId);
    if (!user) {
      user = {
        userId: data.userId,
        nickname: `玩家${data.userId.slice(0, 6)}`,
        cityCode: '',
        cityName: data.locationName || '',
        provinceCode: '',
        provinceName: '',
        district: '',
        districtType: '',
        balance: data.balance,
        totalIncome: 0,
        totalExpense: 0,
        karmaValue: data.karmaValue ?? 50,
        day: data.day || 1,
        lastSettlementDate: new Date().toISOString().split('T')[0],
        updatedAt: new Date(),
      };
      this.users.set(data.userId, user);
    }

    if (data.moneyChange > 0) {
      user.totalIncome += data.moneyChange;
    } else if (data.moneyChange < 0) {
      user.totalExpense += Math.abs(data.moneyChange);
    }
    user.balance = data.balance;
    if (data.karmaValue !== undefined) user.karmaValue = data.karmaValue;
    user.day = data.day || user.day;

    this.saveToDisk();
    return record;
  }

  async getUserRanking(userId: string, cityCode: string, provinceCode: string): Promise<RankingInfo> {
    const allUsers = Array.from(this.users.values());

    const cityUsers = allUsers.filter(u => u.cityCode === cityCode)
      .sort((a, b) => b.balance - a.balance);
    const cityRank = cityUsers.findIndex(u => u.userId === userId) + 1;
    const cityRichest = cityUsers[0] ? { nickname: cityUsers[0].nickname, balance: cityUsers[0].balance } : null;

    const provinceUsers = allUsers.filter(u => u.provinceCode === provinceCode)
      .sort((a, b) => b.balance - a.balance);
    const provinceRank = provinceUsers.findIndex(u => u.userId === userId) + 1;
    const provinceRichest = provinceUsers[0] ? { nickname: provinceUsers[0].nickname, balance: provinceUsers[0].balance } : null;

    const nationalUsers = allUsers.sort((a, b) => b.balance - a.balance);
    const nationalRank = nationalUsers.findIndex(u => u.userId === userId) + 1;
    const nationalRichest = nationalUsers[0] ? { nickname: nationalUsers[0].nickname, balance: nationalUsers[0].balance } : null;

    // expense ranking
    const expenseSorted = allUsers.sort((a, b) => b.totalExpense - a.totalExpense);
    const expenseRank = expenseSorted.findIndex(u => u.userId === userId) + 1;

    // income ranking
    const incomeSorted = allUsers.sort((a, b) => b.totalIncome - a.totalIncome);
    const incomeRank = incomeSorted.findIndex(u => u.userId === userId) + 1;

    return {
      cityRank: cityRank || 1, cityTotal: cityUsers.length || 1, cityRichest,
      provinceRank: provinceRank || 1, provinceTotal: provinceUsers.length || 1, provinceRichest,
      nationalRank: nationalRank || 1, nationalTotal: nationalUsers.length || 1, nationalRichest,
      expenseRank: expenseRank || expenseSorted.length + 1, expenseTotal: expenseSorted.length,
      incomeRank: incomeRank || incomeSorted.length + 1, incomeTotal: incomeSorted.length,
    };
  }

  async getUser(userId: string): Promise<UserRecord | null> {
    return this.users.get(userId) || null;
  }

  async getUserRecords(userId: string): Promise<DailyRecord[]> {
    return this.dailyRecords.filter(r => r.userId === userId);
  }

  async getRichestRankings(cityCode?: string, provinceCode?: string) {
    const allUsers = Array.from(this.users.values());

    const cityUsers = cityCode
      ? allUsers.filter(u => u.cityCode === cityCode).sort((a, b) => b.balance - a.balance).slice(0, 100)
      : [];
    const provinceUsers = provinceCode
      ? allUsers.filter(u => u.provinceCode === provinceCode).sort((a, b) => b.balance - a.balance).slice(0, 100)
      : [];
    const nationalUsers = allUsers.sort((a, b) => b.balance - a.balance).slice(0, 100);

    const fmt = (u: UserRecord, i: number, type: string) => ({
      userId: u.userId, nickname: u.nickname, balance: u.balance,
      day: u.day, city: u.cityName, province: u.provinceName,
      totalIncome: u.totalIncome, totalExpense: u.totalExpense,
      karmaValue: u.karmaValue, rank: i + 1, rankType: type,
    });

    return {
      city: cityUsers.map((u, i) => fmt(u, i, 'city')),
      province: provinceUsers.map((u, i) => fmt(u, i, 'province')),
      national: nationalUsers.map((u, i) => fmt(u, i, 'national')),
    };
  }

  async summaryAllRankings() {
    const allUsers = Array.from(this.users.values());
    const totalUsers = allUsers.length;
    const totalMoney = allUsers.reduce((sum, u) => sum + u.balance, 0);
    const avgBalance = totalUsers > 0 ? Math.round(totalMoney / totalUsers) : 0;

    const sortedUsers = allUsers.sort((a, b) => b.balance - a.balance);
    const richestUser = sortedUsers.length > 0
      ? { nickname: sortedUsers[0].nickname, balance: sortedUsers[0].balance }
      : null;

    const citySet = new Set(allUsers.map(u => u.cityCode));
    const provinceSet = new Set(allUsers.map(u => u.provinceCode));

    return { totalUsers, totalMoney, avgBalance, richestUser, cityCount: citySet.size, provinceCount: provinceSet.size };
  }

  async getExpenseRankings(limit: number = 100) {
    const allUsers = Array.from(this.users.values());
    return allUsers
      .sort((a, b) => b.totalExpense - a.totalExpense)
      .slice(0, limit)
      .map((u, i) => ({
        userId: u.userId, nickname: u.nickname, totalExpense: u.totalExpense,
        currentBalance: u.balance, day: u.day, city: u.cityName, province: u.provinceName, rank: i + 1,
      }));
  }

  async getIncomeRankings(limit: number = 100) {
    const allUsers = Array.from(this.users.values());
    return allUsers
      .sort((a, b) => b.totalIncome - a.totalIncome)
      .slice(0, limit)
      .map((u, i) => ({
        userId: u.userId, nickname: u.nickname, totalIncome: u.totalIncome,
        currentBalance: u.balance, day: u.day, city: u.cityName, province: u.provinceName, rank: i + 1,
      }));
  }

  async getUserExpenseRank(userId: string) {
    const allUsers = Array.from(this.users.values());
    const sorted = allUsers.sort((a, b) => b.totalExpense - a.totalExpense);
    const idx = sorted.findIndex(u => u.userId === userId);
    return { rank: idx >= 0 ? idx + 1 : sorted.length, total: sorted.length };
  }

  async getUserIncomeRank(userId: string) {
    const allUsers = Array.from(this.users.values());
    const sorted = allUsers.sort((a, b) => b.totalIncome - a.totalIncome);
    const idx = sorted.findIndex(u => u.userId === userId);
    return { rank: idx >= 0 ? idx + 1 : sorted.length, total: sorted.length };
  }

  async settleUser(userId: string) {
    const user = this.users.get(userId);
    if (!user) return null;
    user.lastSettlementDate = new Date().toISOString().split('T')[0];
    this.saveToDisk();
    return { date: user.lastSettlementDate, balance: user.balance, karmaValue: user.karmaValue };
  }
}
