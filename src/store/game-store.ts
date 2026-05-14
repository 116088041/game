import { create } from 'zustand';
import { persist, type PersistStorage } from 'zustand/middleware';
import Taro from '@tarojs/taro';

export type GameStatus = 'INIT' | 'PLAYING' | 'EVENT' | 'GAME_OVER';

export interface Location {
  province: string;
  provinceCode: string;
  city: string;
  cityCode: string;
  district: string;
  districtType: string;
}

export interface DailyRecord {
  date: string;
  moneyChange: number;
  balance: number;
  karmaChange: number;
  karmaValue: number;
  eventTitle: string;
  eventResult: string;
  locationName?: string;
}

export interface UserData {
  id: string;
  nickname: string;
  location: Location;
  balance: number;
  totalIncome: number;
  totalExpense: number;
  karmaValue: number;
  startDate: string;
  dailyRecords: DailyRecord[];
  recentEventIds: string[];
  lastSettlementDate: string;
}

export interface RankingInfo {
  // 首富排行
  cityRank: number;
  cityTotal: number;
  cityRichest: { nickname: string; balance: number } | null;
  provinceRank: number;
  provinceTotal: number;
  provinceRichest: { nickname: string; balance: number } | null;
  nationalRank: number;
  nationalTotal: number;
  nationalRichest: { nickname: string; balance: number } | null;
  // 败家子排行
  expenseRank: number;
  expenseTotal: number;
  incomeRank: number;
  incomeTotal: number;
}

interface GameState {
  user: UserData | null;
  gameStatus: GameStatus;
  ranking: RankingInfo | null;
  currentEvent: any | null;
  isLoading: boolean;
  message: string | null;

  setUser: (user: UserData | null) => void;
  updateBalance: (
    change: number,
    karmaChange: number,
    eventTitle: string,
    eventResult: string,
    locationName?: string,
    eventId?: string
  ) => void;
  setGameStatus: (status: GameStatus) => void;
  setCurrentEvent: (event: any | null) => void;
  setRanking: (ranking: RankingInfo | null) => void;
  setLoading: (loading: boolean) => void;
  setMessage: (message: string | null) => void;
  resetGame: () => void;
  syncUserData: (userData: Partial<UserData>) => void;
  setLastSettlementDate: (date: string) => void;
}

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const createInitialUser = (nickname: string, location: Location): UserData => {
  const now = new Date();
  return {
    id: generateId(),
    nickname,
    location,
    balance: 100,
    karmaValue: 50,
    startDate: now.toISOString().split('T')[0],
    dailyRecords: [],
    recentEventIds: [],
    totalIncome: 0,
    totalExpense: 0,
    lastSettlementDate: now.toISOString().split('T')[0],
  };
};

// Taro 小程序存储适配器
const taroStorage: PersistStorage<any> = {
  getItem: (name) => {
    const value = Taro.getStorageSync(name);
    if (value === undefined || value === null || value === '') return null;
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    Taro.setStorageSync(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    Taro.removeStorageSync(name);
  },
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

      updateBalance: (change, karmaChange, eventTitle, eventResult, locationName, eventId) => {
        const { user } = get();
        if (!user) return;

        const newBalance = user.balance + change;
        const newKarma = Math.max(-100, Math.min(100, user.karmaValue + karmaChange));
        const today = new Date().toISOString().split('T')[0];

        const record: DailyRecord = {
          date: today,
          moneyChange: change,
          balance: newBalance,
          karmaChange,
          karmaValue: newKarma,
          eventTitle,
          eventResult,
          locationName,
        };

        const existingIds = user.recentEventIds || [];
        const newRecentIds = eventId !== undefined
          ? [...existingIds, eventId].slice(-100)
          : existingIds;

        set({
          user: {
            ...user,
            balance: newBalance,
            karmaValue: newKarma,
            dailyRecords: [...user.dailyRecords, record],
            recentEventIds: newRecentIds,
            totalIncome: change > 0 ? user.totalIncome + change : user.totalIncome,
            totalExpense: change < 0 ? user.totalExpense + Math.abs(change) : user.totalExpense,
          },
          gameStatus: newBalance <= 0 ? 'GAME_OVER' : 'PLAYING',
        });
      },

      setGameStatus: (status) => set({ gameStatus: status }),

      setCurrentEvent: (event) => set({ currentEvent: event }),

      setRanking: (ranking) => set({ ranking }),

      setLoading: (loading) => set({ isLoading: loading }),

      setMessage: (message) => set({ message }),

      setLastSettlementDate: (date) => {
        const { user } = get();
        if (!user) return;
        set({ user: { ...user, lastSettlementDate: date } });
      },

      resetGame: () => set({
        user: null,
        gameStatus: 'INIT',
        ranking: null,
        currentEvent: null,
        isLoading: false,
        message: null,
      }),

      syncUserData: (userData) => {
        const { user } = get();
        if (!user) return;
        set({ user: { ...user, ...userData } });
      },
    }),
    {
      name: 'game-storage-v2',
      storage: taroStorage,
      partialize: (state) => ({
        user: state.user,
        gameStatus: state.gameStatus,
      }),
    }
  )
);

export const initializeUser = (nickname: string, location: Location) => {
  const user = createInitialUser(nickname, location);
  useGameStore.getState().setUser(user);
  useGameStore.getState().setGameStatus('PLAYING');
  return user;
};
