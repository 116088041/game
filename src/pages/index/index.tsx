import { View, Text, Video } from '@tarojs/components';
import { useState, useCallback } from 'react';
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
    setGameStatus('PLAYING');
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

  if (!user || gameStatus === 'INIT') {
    return (
      <View className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <View className="pt-12 pb-4 text-center">
          <Text className="text-4xl">💰</Text>
          <Text className="block text-2xl font-bold text-amber-600 mt-2">100 块钱做首富</Text>
          <Text className="block text-sm text-gray-400 mt-1">从 100 元起步，逆袭成为全国首富</Text>
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

  const cityDistricts = chinaProvinces
    .find(p => p.code === user.location.provinceCode)
    ?.cities.find(c => c.code === user.location.cityCode)
    ?.districts || [];

  return (
    <View className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {process.env.TARO_ENV !== 'h5' && (
        <View className="fixed inset-0 z-0 opacity-20">
          <Video
            src="https://tos-cn-beijing.volces.com/wonderville/videos/walker.mp4"
            autoplay
            loop
            muted
            style={{ width: '100%', height: '100%' }}
            objectFit="cover"
          />
        </View>
      )}

      <View className="relative z-10 flex flex-col min-h-screen p-4">
        <View className="flex items-center justify-between mb-4">
          <View className="flex-1">
            <Text className="text-sm font-semibold text-gray-800">{user.nickname}</Text>
            <View className="flex items-center gap-1">
              <MapPin size={12} color="#f59e0b" />
              <Text className="text-xs text-gray-500">{user.location.city} · {user.location.district}</Text>
            </View>
          </View>
          <View className="flex items-center gap-3">
            <SettlementBanner lastSettlementDate={user.lastSettlementDate} />
            <Button variant="ghost" size="sm" onClick={() => setShowResetDialog(true)}>
              <RefreshCw size={16} color="#9ca3af" />
            </Button>
          </View>
        </View>

        <View className="bg-white rounded-2xl shadow-sm p-4 mb-6">
          <View className="flex items-center justify-between mb-3">
            <MoneyDisplay balance={user.balance} change={lastMoneyChange} />
            <KarmaDisplay value={user.karmaValue} change={lastKarmaChange} />
          </View>
          <View className="flex justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
            <Text>总收入 ¥{user.totalIncome}</Text>
            <Text>总支出 ¥{user.totalExpense}</Text>
            <Text>事件 {user.dailyRecords.length} 次</Text>
          </View>
        </View>

        <View className="flex-1 flex flex-col items-center justify-center gap-6">
          <Text className="text-5xl">🚶</Text>
          <Text className="text-lg text-gray-600 text-center">
            在 <Text className="font-bold text-amber-600">{user.location.city}</Text> 的街头
          </Text>
          <Button
            className="w-48 h-12 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-lg shadow-amber-200"
            size="lg"
            onClick={() => setShowPicker(true)}
            disabled={gameStatus === 'EVENT'}
          >
            <Text className="text-white font-bold text-base">出门逛逛</Text>
          </Button>
          <Text className="text-xs text-gray-400">随机选择 10 个地点，触发事件</Text>
        </View>

        <LocationPicker
          open={showPicker}
          districts={cityDistricts}
          onSelect={handlePickLocation}
          onClose={() => setShowPicker(false)}
        />

        {currentEvent && gameStatus === 'EVENT' && (
          <EventCard
            event={currentEvent}
            locationName={user.location.district}
            onOptionSelect={handleEventOption}
            onClose={handleEventClose}
          />
        )}

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
              <AlertDialogAction onClick={handleRestart} className="bg-red-500 text-white">
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
