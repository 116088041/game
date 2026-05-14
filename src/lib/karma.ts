// 功德值算法模块

// 功德值范围: -100 ~ 100
// 初始值: 50

/**
 * 根据功德值计算风险事件概率
 * 功德越高 = 风险越低
 * 最低风险率: 20% (功德=100)
 * 最高风险率: 95% (功德=-100)
 */
export const calculateRiskProbability = (karmaValue: number): number => {
  const karmaFactor = Math.max(-1, Math.min(1, karmaValue / 100));
  const riskReduction = karmaFactor * 0.60;
  return Math.max(0.20, Math.min(0.95, 0.80 - riskReduction));
};

/**
 * 根据功德值获取事件类型权重分布
 * - 搞笑故事: 固定 5%
 * - 好事件 (work + opportunity): 5%~35% (功德越高越多)
 * - 风险事件: 剩余比例 (60%~90%)
 */
export const getEventTypeWeights = (karmaValue: number) => {
  const karmaFactor = Math.max(-1, Math.min(1, karmaValue / 100));
  const storyWeight = 0.05;
  const goodWeight = Math.max(0.05, 0.10 + karmaFactor * 0.25);
  const riskWeight = 1 - storyWeight - goodWeight;
  return { story: storyWeight, good: goodWeight, risk: riskWeight };
};

export const clampKarma = (value: number): number =>
  Math.max(-100, Math.min(100, value));

export const getKarmaColor = (value: number): string => {
  if (value >= 80) return '#059669';  // emerald-600
  if (value >= 50) return '#22c55e';  // green-500
  if (value >= 20) return '#84cc16';  // lime-500
  if (value >= 0)  return '#94a3b8';  // slate-400
  if (value >= -30) return '#f97316'; // orange-500
  return '#ef4444';                    // red-500
};

export const getKarmaLabel = (value: number): string => {
  if (value >= 80) return '圣人';
  if (value >= 50) return '好人';
  if (value >= 20) return '良民';
  if (value >= 0)  return '普通';
  if (value >= -30) return '缺德';
  return '恶人';
};
