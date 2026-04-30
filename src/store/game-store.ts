import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 游戏状态枚举
export type GameStatus = 'INIT' | 'PLAYING' | 'EVENT' | 'RANKING' | 'GAME_OVER';

// 用户选择的地点
export interface Location {
  province: string;
  provinceCode: string;
  city: string;
  cityCode: string;
}

// 每日记录
export interface DailyRecord {
  date: string;
  moneyChange: number;
  balance: number;
  moralChange: number; // 道德值变化
  moralValue: number;  // 当天道德值
  eventTitle: string;
  eventResult: string;
  locationName?: string;
}

// 用户数据
export interface UserData {
  id: string;
  nickname: string;
  location: Location;
  balance: number;
  totalBalance: number;
  moralValue: number; // 道德值：-100 到 100
  startDate: string;
  dailyRecords: DailyRecord[];
  recentEventIds: string[]; // 最近100次触发的事件ID，用于去重
}

// 排名信息
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

// 游戏状态接口
interface GameState {
  // 用户数据
  user: UserData | null;
  
  // 当前游戏状态
  gameStatus: GameStatus;
  
  // 排名信息
  ranking: RankingInfo | null;
  
  // 当前事件
  currentEvent: any | null;
  
  // 操作状态
  isLoading: boolean;
  message: string | null;
  
  // 动作
  setUser: (user: UserData | null) => void;
  updateBalance: (change: number, moralChange: number, eventTitle: string, eventResult: string, locationName?: string, eventId?: string) => void;
  setGameStatus: (status: GameStatus) => void;
  setCurrentEvent: (event: any | null) => void;
  setRanking: (ranking: RankingInfo | null) => void;
  setLoading: (loading: boolean) => void;
  setMessage: (message: string | null) => void;
  resetGame: () => void;
  
  // 从后端同步用户数据
  syncUserData: (userData: Partial<UserData>) => void;
}

// 生成唯一ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// 初始用户数据
const createInitialUser = (nickname: string, location: Location): UserData => {
  const now = new Date();
  return {
    id: generateId(),
    nickname,
    location,
    balance: 100,
    totalBalance: 100,
    moralValue: 50, // 初始道德值为50
    startDate: now.toISOString().split('T')[0],
    dailyRecords: [],
    recentEventIds: [] // 初始为空数组
  };
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      user: null,
      gameStatus: 'INIT',
      ranking: null,
      currentEvent: null,
      isLoading: false,
      message: null,
      
      setUser: (user) => set({ user }),
      
      updateBalance: (change, moralChange, eventTitle, eventResult, locationName, eventId) => {
        const { user } = get();
        if (!user) return;
        
        const newBalance = user.balance + change;
        const newMoralValue = Math.max(-100, Math.min(100, user.moralValue + moralChange));
        const today = new Date().toISOString().split('T')[0];
        
        const dailyRecord: DailyRecord = {
          date: today,
          moneyChange: change,
          balance: newBalance,
          moralChange,
          moralValue: newMoralValue,
          eventTitle,
          eventResult,
          locationName
        };
        
        // 更新最近事件ID列表，最多保留100个用于去重
        const existingRecentIds = user.recentEventIds || [];
        const newRecentEventIds = eventId !== undefined
          ? [...existingRecentIds, eventId].slice(-100)
          : existingRecentIds;
        
        set({
          user: {
            ...user,
            balance: newBalance,
            totalBalance: user.totalBalance + Math.abs(change),
            moralValue: newMoralValue,
            dailyRecords: [...user.dailyRecords, dailyRecord],
            recentEventIds: newRecentEventIds
          },
          gameStatus: newBalance <= 0 ? 'GAME_OVER' : 'PLAYING'
        });
      },
      
      setGameStatus: (status) => set({ gameStatus: status }),
      
      setCurrentEvent: (event) => set({ currentEvent: event }),
      
      setRanking: (ranking) => set({ ranking }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setMessage: (message) => set({ message }),
      
      resetGame: () => set({
        user: null,
        gameStatus: 'INIT',
        ranking: null,
        currentEvent: null,
        isLoading: false,
        message: null
      }),
      
      syncUserData: (userData) => {
        const { user } = get();
        if (!user) return;
        set({ user: { ...user, ...userData } });
      }
    }),
    {
      name: 'game-storage',
      partialize: (state) => ({
        user: state.user,
        gameStatus: state.gameStatus
      })
    }
  )
);

// 初始化用户
export const initializeUser = (nickname: string, location: Location) => {
  const user = createInitialUser(nickname, location);
  useGameStore.getState().setUser(user);
  useGameStore.getState().setGameStatus('PLAYING');
  return user;
};
