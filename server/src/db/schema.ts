import { mysqlTable, varchar, int, text, datetime } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  userId: varchar('user_id', { length: 64 }).primaryKey(),
  nickname: varchar('nickname', { length: 32 }).notNull(),
  cityCode: varchar('city_code', { length: 16 }).notNull(),
  cityName: varchar('city_name', { length: 64 }).notNull(),
  provinceCode: varchar('province_code', { length: 16 }).notNull(),
  provinceName: varchar('province_name', { length: 64 }).notNull(),
  district: varchar('district', { length: 64 }).default(''),
  districtType: varchar('district_type', { length: 16 }).default(''),
  balance: int('balance').default(100).notNull(),
  totalIncome: int('total_income').default(0).notNull(),
  totalExpense: int('total_expense').default(0).notNull(),
  karmaValue: int('karma_value').default(50).notNull(),
  day: int('day').default(1).notNull(),
  lastSettlementDate: varchar('last_settlement_date', { length: 16 }).default(''),
  updatedAt: datetime('updated_at').default(new Date()).notNull(),
});

export const dailyRecords = mysqlTable('daily_records', {
  id: int('id').autoincrement().primaryKey(),
  userId: varchar('user_id', { length: 64 }).notNull(),
  day: int('day').default(1).notNull(),
  eventTitle: varchar('event_title', { length: 128 }).notNull(),
  eventResult: text('event_result'),
  moneyChange: int('money_change').default(0).notNull(),
  karmaChange: int('karma_change').default(0).notNull(),
  karmaValue: int('karma_value').default(50).notNull(),
  balance: int('balance').default(0).notNull(),
  locationName: varchar('location_name', { length: 64 }).default(''),
  createdAt: datetime('created_at').default(new Date()).notNull(),
});
