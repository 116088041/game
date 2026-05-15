import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { getDb, isDbAvailable } from '../db/connection';
import { users, dailyRecords } from '../db/schema';
import { eq, desc } from 'drizzle-orm';
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
  private readonly logger = new Logger(GameService.name);
  private fileUsers: Map<string, UserRecord> = new Map();
  private fileRecords: DailyRecord[] = [];
  private useDb = false;

  onModuleInit() {
    this.useDb = isDbAvailable();
    if (!this.useDb) {
      this.loadFromDisk();
      this.logger.log('使用本地 JSON 文件存储');
    } else {
      this.logger.log('使用 MySQL 数据库存储');
    }
  }

  private get db() {
    return getDb()!;
  }

  // ===== JSON 文件存储 =====
  private saveToDisk() {
    try {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify({
        users: Array.from(this.fileUsers.entries()),
        dailyRecords: this.fileRecords,
      }));
    } catch (e) {
      this.logger.error('保存数据失败:', e);
    }
  }

  private loadFromDisk() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const data = JSON.parse(raw);
        this.fileUsers = new Map(data.users || []);
        this.fileRecords = data.dailyRecords || [];
      }
    } catch (e) {
      this.logger.error('加载数据失败:', e);
    }
  }

  // ===== 公共接口 =====
  async createOrUpdateUser(data: {
    userId: string; nickname: string; cityCode: string; cityName: string;
    provinceCode: string; provinceName: string; district?: string;
    districtType?: string; balance: number; karmaValue?: number;
    totalIncome?: number; totalExpense?: number; day: number;
  }): Promise<UserRecord> {
    const record: UserRecord = {
      userId: data.userId, nickname: data.nickname,
      cityCode: data.cityCode, cityName: data.cityName,
      provinceCode: data.provinceCode, provinceName: data.provinceName,
      district: data.district || '', districtType: data.districtType || '',
      balance: data.balance, totalIncome: data.totalIncome || 0,
      totalExpense: data.totalExpense || 0,
      karmaValue: data.karmaValue ?? 50, day: data.day,
      lastSettlementDate: new Date().toISOString().split('T')[0],
      updatedAt: new Date(),
    };

    if (this.useDb) {
      const existing = await this.db.select().from(users).where(eq(users.userId, data.userId)).limit(1);
      if (existing.length === 0) {
        await this.db.insert(users).values(record as any);
      } else {
        await this.db.update(users).set(record as any).where(eq(users.userId, data.userId));
      }
    } else {
      this.fileUsers.set(data.userId, record);
      this.saveToDisk();
    }
    return record;
  }

  async recordDailyEvent(data: {
    userId: string; day?: number; eventTitle: string; eventResult: string;
    moneyChange: number; karmaChange?: number; karmaValue?: number;
    balance: number; locationName?: string;
  }): Promise<DailyRecord> {
    const record: DailyRecord = {
      userId: data.userId, day: data.day || 1,
      eventTitle: data.eventTitle, eventResult: data.eventResult,
      moneyChange: data.moneyChange, karmaChange: data.karmaChange || 0,
      karmaValue: data.karmaValue ?? 50, balance: data.balance,
      locationName: data.locationName, createdAt: new Date(),
    };

    if (this.useDb) {
      await this.db.insert(dailyRecords).values(record as any);
      const existing = await this.db.select().from(users).where(eq(users.userId, data.userId)).limit(1);
      if (existing.length > 0) {
        const u = existing[0];
        const updates: any = { balance: data.balance, updatedAt: new Date() };
        if (data.karmaValue !== undefined) updates.karmaValue = data.karmaValue;
        if (data.moneyChange > 0) updates.totalIncome = u.totalIncome + data.moneyChange;
        else if (data.moneyChange < 0) updates.totalExpense = u.totalExpense + Math.abs(data.moneyChange);
        await this.db.update(users).set(updates).where(eq(users.userId, data.userId));
      }
    } else {
      this.fileRecords.push(record);
      let user = this.fileUsers.get(data.userId);
      if (!user) {
        user = {
          userId: data.userId, nickname: `玩家${data.userId.slice(0, 6)}`,
          cityCode: '', cityName: data.locationName || '',
          provinceCode: '', provinceName: '', district: '', districtType: '',
          balance: data.balance, totalIncome: 0, totalExpense: 0,
          karmaValue: data.karmaValue ?? 50, day: data.day || 1,
          lastSettlementDate: new Date().toISOString().split('T')[0],
          updatedAt: new Date(),
        };
        this.fileUsers.set(data.userId, user);
      }
      if (data.moneyChange > 0) user.totalIncome += data.moneyChange;
      else if (data.moneyChange < 0) user.totalExpense += Math.abs(data.moneyChange);
      user.balance = data.balance;
      if (data.karmaValue !== undefined) user.karmaValue = data.karmaValue;
      this.saveToDisk();
    }
    return record;
  }

  async getUserRanking(userId: string, cityCode: string, provinceCode: string): Promise<RankingInfo> {
    const allUsers = this.useDb
      ? await this.db.select().from(users)
      : Array.from(this.fileUsers.values());

    const cityUsers = allUsers.filter((u: any) => u.cityCode === cityCode).sort((a: any, b: any) => b.balance - a.balance);
    const provinceUsers = allUsers.filter((u: any) => u.provinceCode === provinceCode).sort((a: any, b: any) => b.balance - a.balance);
    const nationalUsers = [...allUsers].sort((a: any, b: any) => b.balance - a.balance);
    const expenseSorted = [...allUsers].sort((a: any, b: any) => b.totalExpense - a.totalExpense);
    const incomeSorted = [...allUsers].sort((a: any, b: any) => b.totalIncome - a.totalIncome);

    return {
      cityRank: cityUsers.findIndex((u: any) => u.userId === userId) + 1 || 1, cityTotal: cityUsers.length || 1,
      cityRichest: cityUsers[0] ? { nickname: cityUsers[0].nickname, balance: cityUsers[0].balance } : null,
      provinceRank: provinceUsers.findIndex((u: any) => u.userId === userId) + 1 || 1, provinceTotal: provinceUsers.length || 1,
      provinceRichest: provinceUsers[0] ? { nickname: provinceUsers[0].nickname, balance: provinceUsers[0].balance } : null,
      nationalRank: nationalUsers.findIndex((u: any) => u.userId === userId) + 1 || 1, nationalTotal: nationalUsers.length || 1,
      nationalRichest: nationalUsers[0] ? { nickname: nationalUsers[0].nickname, balance: nationalUsers[0].balance } : null,
      expenseRank: expenseSorted.findIndex((u: any) => u.userId === userId) + 1 || expenseSorted.length + 1, expenseTotal: expenseSorted.length,
      incomeRank: incomeSorted.findIndex((u: any) => u.userId === userId) + 1 || incomeSorted.length + 1, incomeTotal: incomeSorted.length,
    };
  }

  async getUser(userId: string): Promise<UserRecord | null> {
    if (this.useDb) {
      const result = await this.db.select().from(users).where(eq(users.userId, userId)).limit(1);
      return (result[0] as UserRecord) || null;
    }
    return this.fileUsers.get(userId) || null;
  }

  async getUserRecords(userId: string): Promise<DailyRecord[]> {
    if (this.useDb) {
      const records = await this.db.select().from(dailyRecords).where(eq(dailyRecords.userId, userId)).orderBy(desc(dailyRecords.createdAt));
      return records as DailyRecord[];
    }
    return this.fileRecords.filter(r => r.userId === userId);
  }

  async getRichestRankings(cityCode?: string, provinceCode?: string) {
    const allUsers = this.useDb
      ? await this.db.select().from(users).orderBy(desc(users.balance)).limit(100)
      : Array.from(this.fileUsers.values()).sort((a, b) => b.balance - a.balance).slice(0, 100);

    const cityUsers = this.useDb && cityCode
      ? await this.db.select().from(users).where(eq(users.cityCode, cityCode)).orderBy(desc(users.balance)).limit(100)
      : [];
    const provinceUsers = this.useDb && provinceCode
      ? await this.db.select().from(users).where(eq(users.provinceCode, provinceCode)).orderBy(desc(users.balance)).limit(100)
      : [];

    const fmt = (u: any, i: number, type: string) => ({
      userId: u.userId, nickname: u.nickname, balance: u.balance,
      day: u.day, city: u.cityName, province: u.provinceName,
      totalIncome: u.totalIncome, totalExpense: u.totalExpense,
      karmaValue: u.karmaValue, rank: i + 1, rankType: type,
    });

    return {
      city: cityUsers.map((u: any, i: number) => fmt(u, i, 'city')),
      province: provinceUsers.map((u: any, i: number) => fmt(u, i, 'province')),
      national: allUsers.map((u: any, i: number) => fmt(u, i, 'national')),
    };
  }

  async summaryAllRankings() {
    const allUsers = this.useDb
      ? await this.db.select().from(users)
      : Array.from(this.fileUsers.values());
    const totalUsers = allUsers.length;
    const totalMoney = allUsers.reduce((sum: number, u: any) => sum + u.balance, 0);
    const avgBalance = totalUsers > 0 ? Math.round(totalMoney / totalUsers) : 0;
    const sortedUsers = [...allUsers].sort((a: any, b: any) => b.balance - a.balance);
    const richestUser = sortedUsers.length > 0 ? { nickname: sortedUsers[0].nickname, balance: sortedUsers[0].balance } : null;
    const citySet = new Set(allUsers.map((u: any) => u.cityCode));
    const provinceSet = new Set(allUsers.map((u: any) => u.provinceCode));
    return { totalUsers, totalMoney, avgBalance, richestUser, cityCount: citySet.size, provinceCount: provinceSet.size };
  }

  async getExpenseRankings(limit: number = 100) {
    const allUsers = this.useDb
      ? await this.db.select().from(users).orderBy(desc(users.totalExpense)).limit(limit)
      : Array.from(this.fileUsers.values()).sort((a, b) => b.totalExpense - a.totalExpense).slice(0, limit);
    return allUsers.map((u: any, i: number) => ({
      userId: u.userId, nickname: u.nickname, totalExpense: u.totalExpense,
      currentBalance: u.balance, day: u.day, city: u.cityName, province: u.provinceName, rank: i + 1,
    }));
  }

  async getIncomeRankings(limit: number = 100) {
    const allUsers = this.useDb
      ? await this.db.select().from(users).orderBy(desc(users.totalIncome)).limit(limit)
      : Array.from(this.fileUsers.values()).sort((a, b) => b.totalIncome - a.totalIncome).slice(0, limit);
    return allUsers.map((u: any, i: number) => ({
      userId: u.userId, nickname: u.nickname, totalIncome: u.totalIncome,
      currentBalance: u.balance, day: u.day, city: u.cityName, province: u.provinceName, rank: i + 1,
    }));
  }

  async getUserExpenseRank(userId: string) {
    const allUsers = this.useDb
      ? await this.db.select().from(users).orderBy(desc(users.totalExpense))
      : Array.from(this.fileUsers.values()).sort((a, b) => b.totalExpense - a.totalExpense);
    const idx = allUsers.findIndex((u: any) => u.userId === userId);
    return { rank: idx >= 0 ? idx + 1 : allUsers.length, total: allUsers.length };
  }

  async getUserIncomeRank(userId: string) {
    const allUsers = this.useDb
      ? await this.db.select().from(users).orderBy(desc(users.totalIncome))
      : Array.from(this.fileUsers.values()).sort((a, b) => b.totalIncome - a.totalIncome);
    const idx = allUsers.findIndex((u: any) => u.userId === userId);
    return { rank: idx >= 0 ? idx + 1 : allUsers.length, total: allUsers.length };
  }

  async settleUser(userId: string) {
    const date = new Date().toISOString().split('T')[0];
    if (this.useDb) {
      await this.db.update(users).set({ lastSettlementDate: date } as any).where(eq(users.userId, userId));
    } else {
      const user = this.fileUsers.get(userId);
      if (user) {
        user.lastSettlementDate = date;
        this.saveToDisk();
      }
    }
    const result = await this.getUser(userId);
    return result ? { date, balance: result.balance, karmaValue: result.karmaValue } : null;
  }
}
