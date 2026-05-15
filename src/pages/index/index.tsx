import { View, Text } from '@tarojs/components';
import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { MapPin, RefreshCw } from 'lucide-react-taro';
import { chinaProvinces, type Province, type City, type District } from '@/data/china-cities';
import { getWeightedRandomEventByMoral, type GameEventOption } from '@/data/game-events';
import { useGameStore, initializeUser } from '@/store/game-store';
import { Network } from '@/network';
import { isSettlementDue, calculateSettlement } from '@/lib/settlement';
import { LocationSelector } from '@/components/game/LocationSelector';
import { LocationPicker } from '@/components/game/LocationPicker';
import { MoneyDisplay } from '@/components/game/MoneyDisplay';
import { KarmaDisplay } from '@/components/game/KarmaDisplay';
import { EventCard } from '@/components/game/EventCard';
import { SettlementBanner } from '@/components/game/SettlementBanner';
import { GameOverView } from '@/components/game/GameOverView';
import './index.css';

const IndexPage = () => {
  const { user, gameStatus, currentEvent, updateBalance, setGameStatus, setCurrentEvent, resetGame, setLastSettlementDate } = useGameStore();

  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [nickname, setNickname] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [lastMoneyChange, setLastMoneyChange] = useState(0);
  const [lastKarmaChange, setLastKarmaChange] = useState(0);

  const checkSettlement = useCallback(() => {
    if (!user || gameStatus !== 'PLAYING') return;
    if (isSettlementDue(user.lastSettlementDate)) {
      const result = calculateSettlement(user.balance, user.karmaValue);
      setLastSettlementDate(result.date);
      Network.request({
        url: '/api/game/settle',
        method: 'POST',
        data: { userId: user.id },
      }).catch(() => {});
    }
  }, [user, gameStatus]);

  // 游戏结束时同步数据到服务器
  useEffect(() => {
    if (gameStatus === 'GAME_OVER' && user) {
      Network.request({
        url: '/api/game/user',
        method: 'POST',
        data: {
          userId: user.id,
          nickname: user.nickname,
          provinceCode: user.location.provinceCode,
          provinceName: user.location.province,
          cityCode: user.location.cityCode,
          cityName: user.location.city,
          district: user.location.district,
          districtType: user.location.districtType,
          balance: user.balance,
          karmaValue: user.karmaValue,
          totalIncome: user.totalIncome,
          totalExpense: user.totalExpense,
          day: user.dailyRecords.length || 1,
        },
      }).catch(() => {});
    }
  }, [gameStatus, user]);

  const handleBirthComplete = () => {
    if (!selectedProvince || !selectedCity || !selectedDistrict || !nickname.trim()) return;

    const location = {
      province: selectedProvince.name,
      provinceCode: selectedProvince.code,
      city: selectedCity.name,
      cityCode: selectedCity.code,
      district: selectedDistrict.name,
      districtType: selectedDistrict.type,
    };

    initializeUser(nickname.trim(), location);

    const u = useGameStore.getState().user;
    if (u) {
      Network.request({
        url: '/api/game/user',
        method: 'POST',
        data: {
          userId: u.id,
          nickname: u.nickname,
          provinceCode: u.location.provinceCode,
          provinceName: u.location.province,
          cityCode: u.location.cityCode,
          cityName: u.location.city,
          district: u.location.district,
          districtType: u.location.districtType,
          balance: u.balance,
          karmaValue: u.karmaValue,
          day: 1,
        },
      }).catch(() => {});
    }
  };

  const handlePickLocation = (_district: District) => {
    setShowPicker(false);
    if (!user) return;

    const event = getWeightedRandomEventByMoral(user.karmaValue, user.recentEventIds);
    if (event) {
      setCurrentEvent(event);
      setGameStatus('EVENT');
    }
  };

  const handleEventOption = (option: GameEventOption, moneyChange: number) => {
    if (!user || !currentEvent) return;

    const karmaChange = option.moralValue;

    updateBalance(moneyChange, karmaChange, currentEvent.title, option.description, user.location.district, currentEvent.id);

    setLastMoneyChange(moneyChange);
    setLastKarmaChange(karmaChange);

    Network.request({
      url: '/api/game/record',
      method: 'POST',
      data: {
        userId: user.id,
        eventTitle: currentEvent.title,
        eventResult: option.description,
        moneyChange,
        karmaChange,
        balance: user.balance + moneyChange,
        karmaValue: Math.max(-100, Math.min(100, user.karmaValue + karmaChange)),
        locationName: user.location.district,
      },
    }).catch(() => {});
  };

  const handleEventClose = () => {
    setCurrentEvent(null);
    const currentUser = useGameStore.getState().user;
    if (currentUser && currentUser.balance <= 0) {
      setGameStatus('GAME_OVER');
    } else {
      setGameStatus('PLAYING');
    }
    checkSettlement();
  };

  const handleRestart = () => {
    resetGame();
    setSelectedProvince(null);
    setSelectedCity(null);
    setSelectedDistrict(null);
    setNickname('');
    setLastMoneyChange(0);
    setLastKarmaChange(0);
  };

  // ===== INIT 视图 =====
  if (!user || gameStatus === 'INIT') {
    return (
      <View className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
        <View className="pt-14 pb-6 text-center">
          <Text className="text-4xl">🍍</Text>
          <Text className="block text-2xl font-bold text-orange-500 mt-3">100 块钱做首富</Text>
          <Text className="block text-sm text-orange-400 mt-1.5">从 100 元起步，逆袭成为全国首富</Text>
        </View>
        <LocationSelector
          selectedProvince={selectedProvince}
          setSelectedProvince={setSelectedProvince}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          nickname={nickname}
          setNickname={setNickname}
          onComplete={handleBirthComplete}
        />
      </View>
    );
  }

  // ===== 破产视图 =====
  if (gameStatus === 'GAME_OVER') {
    const daysSurvived = user.dailyRecords.length > 0
      ? Math.ceil((Date.now() - new Date(user.startDate).getTime()) / 86400000)
      : 0;
    return (
      <GameOverView
        daysSurvived={daysSurvived || 1}
        totalIncome={user.totalIncome}
        totalExpense={user.totalExpense}
        onRestart={handleRestart}
      />
    );
  }

  // ===== 游戏主界面 =====
  const cityDistricts = chinaProvinces
    .find(p => p.code === user.location.provinceCode)
    ?.cities.find(c => c.code === user.location.cityCode)
    ?.districts || [];

  return (
    <View className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      <View className="flex flex-col min-h-screen pb-16">
        {/* 顶部信息栏 */}
        <View className="px-4 pt-3 pb-2">
          <View className="flex items-center justify-between">
            <View className="flex-1 min-w-0 mr-3">
              <Text className="block text-sm font-semibold text-stone-800 truncate">{user.nickname}</Text>
              <View className="flex items-center gap-1">
                <MapPin size={11} color="#f97316" />
                <Text className="text-xs text-stone-400 truncate">{user.location.city} · {user.location.district}</Text>
              </View>
            </View>
            <View className="flex items-center gap-2 flex-shrink-0">
              <SettlementBanner lastSettlementDate={user.lastSettlementDate} />
              <Button variant="ghost" size="sm" onClick={() => setShowResetDialog(true)}>
                <RefreshCw size={15} color="#94a3b8" />
              </Button>
            </View>
          </View>
        </View>

        {/* 余额 & 功德卡片 */}
        <View className="px-4 mb-3">
          <View className="bg-white rounded-2xl shadow-sm border border-orange-100 p-3">
            <View className="flex items-center justify-between mb-2">
              <MoneyDisplay balance={user.balance} change={lastMoneyChange} />
              <KarmaDisplay value={user.karmaValue} change={lastKarmaChange} />
            </View>
            <View className="flex justify-between text-xs text-stone-400 pt-2 border-t border-orange-50">
              <Text>收入 ¥{user.totalIncome}</Text>
              <Text>支出 ¥{user.totalExpense}</Text>
              <Text>事件 {user.dailyRecords.length} 次</Text>
            </View>
          </View>
        </View>

        {/* 中央行动区 */}
        <View className="flex-1 flex flex-col items-center justify-start pt-10 gap-3 px-4">
          <Text className="text-4xl">🚶</Text>
          <Text className="text-sm text-stone-500 text-center">
            在 <Text className="font-bold text-orange-500">{user.location.city}</Text> 的街头
          </Text>
          <Button
            className="w-44 h-11 bg-orange-500 text-white rounded-full shadow-lg shadow-orange-200"
            size="lg"
            onClick={() => setShowPicker(true)}
            disabled={gameStatus === 'EVENT' || user.balance <= 0}
          >
            <Text className="text-white font-bold text-sm">出门逛逛</Text>
          </Button>
          <Text className="text-xs text-stone-400">随机选 10 个地点，触发随机事件</Text>
        </View>

        {/* 地点选择弹窗 */}
        <LocationPicker
          open={showPicker}
          districts={cityDistricts}
          onSelect={handlePickLocation}
          onClose={() => setShowPicker(false)}
        />

        {/* 事件卡片 */}
        {currentEvent && gameStatus === 'EVENT' && (
          <EventCard
            event={currentEvent}
            locationName={user.location.district}
            onOptionSelect={handleEventOption}
            onClose={handleEventClose}
          />
        )}

        {/* 重置确认弹窗 */}
        <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>确定要重新开始吗？</AlertDialogTitle>
              <AlertDialogDescription>
                当前游戏进度将会丢失，所有数据无法恢复。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction onClick={handleRestart} className="bg-rose-500 text-white">
                确认重置
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </View>
    </View>
  );
};

export default IndexPage;
