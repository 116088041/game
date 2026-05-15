import { Module, Global, OnModuleInit, Logger } from '@nestjs/common';
import { getDb, isDbAvailable } from './connection';

@Global()
@Module({})
export class DbModule implements OnModuleInit {
  private readonly logger = new Logger(DbModule.name);

  async onModuleInit() {
    const db = getDb();
    if (!db) {
      this.logger.warn('MySQL 不可用，使用本地 JSON 文件存储');
      return;
    }

    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS users (
          user_id VARCHAR(64) PRIMARY KEY,
          nickname VARCHAR(32) NOT NULL,
          city_code VARCHAR(16) NOT NULL,
          city_name VARCHAR(64) NOT NULL,
          province_code VARCHAR(16) NOT NULL,
          province_name VARCHAR(64) NOT NULL,
          district VARCHAR(64) DEFAULT '',
          district_type VARCHAR(16) DEFAULT '',
          balance INT DEFAULT 100 NOT NULL,
          total_income INT DEFAULT 0 NOT NULL,
          total_expense INT DEFAULT 0 NOT NULL,
          karma_value INT DEFAULT 50 NOT NULL,
          day INT DEFAULT 1 NOT NULL,
          last_settlement_date VARCHAR(16) DEFAULT '',
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `);
      await db.execute(`
        CREATE TABLE IF NOT EXISTS daily_records (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id VARCHAR(64) NOT NULL,
          day INT DEFAULT 1 NOT NULL,
          event_title VARCHAR(128) NOT NULL,
          event_result TEXT,
          money_change INT DEFAULT 0 NOT NULL,
          karma_change INT DEFAULT 0 NOT NULL,
          karma_value INT DEFAULT 50 NOT NULL,
          balance INT DEFAULT 0 NOT NULL,
          location_name VARCHAR(64) DEFAULT '',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `);
      this.logger.log('MySQL 数据库表初始化完成');
    } catch (err: any) {
      this.logger.warn('MySQL 连接失败，使用本地 JSON 文件存储');
      dbAvailable = false;
    }
  }
}

let dbAvailable = true;
export const setDbUnavailable = () => { dbAvailable = false; };
export const isDbReady = () => dbAvailable && isDbAvailable();
