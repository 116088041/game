/**
 * 每日 18:00 结算逻辑
 */

export interface SettlementResult {
  date: string;
  balance: number;
  karmaValue: number;
}

/**
 * 检查是否需要结算
 * 每天 18:00 触发一次
 */
export const isSettlementDue = (lastSettlementDate: string | undefined): boolean => {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  if (lastSettlementDate === today) return false;
  if (now.getHours() < 18) return false;
  return true;
};

/**
 * 执行结算
 * 返回当日最终状态快照
 */
export const calculateSettlement = (
  balance: number,
  karmaValue: number,
): SettlementResult => {
  return {
    date: new Date().toISOString().split('T')[0],
    balance,
    karmaValue,
  };
};
