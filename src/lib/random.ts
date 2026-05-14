import type { District } from '@/data/china-cities';

/**
 * 从城市区域列表中随机选择 N 个地点
 * 优先确保类型多样性（每种类型至少1个）
 */
export const pickRandomDistricts = (
  districts: District[],
  count: number = 10
): District[] => {
  if (districts.length <= count) {
    return [...districts].sort(() => Math.random() - 0.5);
  }

  const shuffled = [...districts].sort(() => Math.random() - 0.5);
  const types = ['district', 'business', 'scenic', 'street'] as const;
  const result: District[] = [];
  const used = new Set<string>();

  // 第一轮: 每种类型各选一个
  for (const type of types) {
    const match = shuffled.find(d => d.type === type && !used.has(d.name));
    if (match && result.length < count) {
      result.push(match);
      used.add(match.name);
    }
  }

  // 第二轮: 填充剩余
  for (const d of shuffled) {
    if (result.length >= count) break;
    if (!used.has(d.name)) {
      result.push(d);
      used.add(d.name);
    }
  }

  return result.sort(() => Math.random() - 0.5);
};

/**
 * Fisher-Yates 洗牌
 */
export const shuffle = <T>(arr: T[]): T[] => {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
