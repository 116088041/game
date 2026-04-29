import { View, Text, ScrollView, Video } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Taro from '@tarojs/taro';
import { 
  Trophy, Coins, MapPin, Calendar, TrendingUp, 
  TrendingDown, CircleAlert, Zap, Crown, Building,
  RefreshCw, User, Clock, Map, Navigation, Store
} from 'lucide-react-taro';
import { chinaProvinces, type Province, type City, type District } from '@/data/china-cities';
import { getWeightedRandomEvent, getRandomOption, type GameEvent } from '@/data/game-events';
import { useGameStore, initializeUser, type RankingInfo } from '@/store/game-store';
import { Network } from '@/network';
import './index.css';

// 跨端兼容：获取input事件的值
const getInputValue = (e: any): string => {
  if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP || Taro.getEnv() === Taro.ENV_TYPE.TT) {
    return e.detail.value;
  }
  // H5 环境
  return e.target?.value || '';
};

// 获取地点类型的图标和颜色
const getDistrictIcon = (type: District['type']) => {
  switch (type) {
    case 'district': return { icon: Building, color: '#6b7280', bg: 'bg-gray-100' };
    case 'business': return { icon: Store, color: '#f59e0b', bg: 'bg-amber-100' };
    case 'scenic': return { icon: Map, color: '#10b981', bg: 'bg-green-100' };
    case 'street': return { icon: Navigation, color: '#8b5cf6', bg: 'bg-purple-100' };
    default: return { icon: MapPin, color: '#6b7280', bg: 'bg-gray-100' };
  }
};

// 获取地点类型名称
const getDistrictTypeName = (type: District['type']) => {
  switch (type) {
    case 'district': return '区县';
    case 'business': return '商圈';
    case 'scenic': return '景点';
    case 'street': return '街区';
    default: return '地点';
  }
};

// 出生地选择器组件
const LocationSelector = ({ 
  selectedProvince, 
  setSelectedProvince,
  selectedCity,
  setSelectedCity,
  nickname,
  setNickname
}: {
  selectedProvince: Province | null;
  setSelectedProvince: (p: Province) => void;
  selectedCity: City | null;
  setSelectedCity: (c: City) => void;
  nickname: string;
  setNickname: (n: string) => void;
}) => {
  const [step, setStep] = useState<'nickname' | 'province' | 'city'>('nickname');
  const [searchText, setSearchText] = useState('');

  const filteredProvinces = chinaProvinces.filter(p => 
    p.name.includes(searchText) || p.code.includes(searchText)
  );

  const filteredCities = selectedProvince?.cities.filter(c =>
    c.name.includes(searchText) || c.code.includes(searchText)
  ) || [];

  return (
    <View className="flex flex-col h-full">
      {/* 步骤指示器 */}
      <View className="flex items-center justify-center gap-2 py-4">
        <View className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'nickname' ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-600'}`}>
          <Text className="text-sm font-bold">{step === 'nickname' ? '1' : '✓'}</Text>
        </View>
        <View className="w-8 h-1 bg-amber-200" />
        <View className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'province' ? 'bg-amber-500 text-white' : selectedProvince ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'}`}>
          <Text className="text-sm font-bold">{selectedProvince ? '✓' : '2'}</Text>
        </View>
        <View className="w-8 h-1 bg-amber-200" />
        <View className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'city' && selectedProvince ? 'bg-amber-500 text-white' : selectedCity ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'}`}>
          <Text className="text-sm font-bold">{selectedCity ? '✓' : '3'}</Text>
        </View>
      </View>

      {/* 昵称输入 */}
      {step === 'nickname' && (
        <View className="flex-1 flex flex-col px-4">
          <Text className="text-2xl font-bold text-center mb-2 text-gray-800">欢迎来到游戏世界</Text>
          <Text className="text-base text-center mb-8 text-gray-500">你将从一个默默无闻的小人物开始，用100块钱逆袭成为首富</Text>
          
          <View className="bg-white rounded-2xl p-6 shadow-sm">
            <Text className="block text-base font-medium mb-2 text-gray-700">给自己取个响亮的昵称</Text>
            <View className="bg-gray-50 rounded-xl px-4 py-3 mb-4">
              <input
                type="text"
                className="w-full bg-transparent text-base"
                placeholder="输入你的昵称"
                value={nickname}
                onInput={(e: any) => setNickname(getInputValue(e))}
                maxLength={10}
              />
            </View>
            <Text className="block text-sm text-gray-400 mb-4">昵称将在排行榜中展示</Text>
            
            <Button 
              className="w-full bg-amber-500 hover:bg-amber-600 text-white"
              disabled={!nickname.trim()}
              onClick={() => setStep('province')}
            >
              <Text className="text-base font-medium">下一步</Text>
            </Button>
          </View>
        </View>
      )}

      {/* 省份选择 */}
      {step === 'province' && (
        <View className="flex-1 flex flex-col">
          <View className="px-4 py-2">
            <View className="bg-gray-50 rounded-xl px-4 py-2">
              <input
                type="text"
                className="w-full bg-transparent text-base"
                placeholder="搜索省份..."
                value={searchText}
                onInput={(e: any) => setSearchText(getInputValue(e))}
              />
            </View>
          </View>
          
          <ScrollView scrollY className="flex-1 px-4">
            <View className="grid grid-cols-3 gap-2 pb-4">
              {filteredProvinces.map(province => (
                <View 
                  key={province.code}
                  className={`p-3 rounded-xl text-center ${selectedProvince?.code === province.code ? 'bg-amber-500 text-white' : 'bg-gray-50 text-gray-700'}`}
                  onClick={() => setSelectedProvince(province)}
                >
                  <Text className="block text-sm truncate">{province.name}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
          
          <View className="px-4 py-3 bg-white border-t border-gray-100">
            <View className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep('nickname')}>
                <Text>上一步</Text>
              </Button>
              <Button 
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
                disabled={!selectedProvince}
                onClick={() => setStep('city')}
              >
                <Text>下一步</Text>
              </Button>
            </View>
          </View>
        </View>
      )}

      {/* 城市选择 */}
      {step === 'city' && selectedProvince && (
        <View className="flex-1 flex flex-col">
          <View className="px-4 py-2">
            <Text className="block text-base font-medium mb-2 text-gray-700">
              选择城市 - {selectedProvince.name}
            </Text>
            <View className="bg-gray-50 rounded-xl px-4 py-2">
              <input
                type="text"
                className="w-full bg-transparent text-base"
                placeholder="搜索城市..."
                value={searchText}
                onInput={(e: any) => setSearchText(getInputValue(e))}
              />
            </View>
          </View>
          
          <ScrollView scrollY className="flex-1 px-4">
            <View className="grid grid-cols-3 gap-2 pb-4">
              {filteredCities.map(city => (
                <View 
                  key={city.code}
                  className={`p-3 rounded-xl text-center ${selectedCity?.code === city.code ? 'bg-amber-500 text-white' : 'bg-gray-50 text-gray-700'}`}
                  onClick={() => setSelectedCity(city)}
                >
                  <Text className="block text-sm truncate">{city.name}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
          
          <View className="px-4 py-3 bg-white border-t border-gray-100">
            <View className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep('province')}>
                <Text>上一步</Text>
              </Button>
              <Button 
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
                disabled={!selectedCity}
                onClick={() => {
                  if (selectedProvince && selectedCity) {
                    initializeUser(nickname, {
                      province: selectedProvince.name,
                      provinceCode: selectedProvince.code.slice(0, 2) + '0000', // 省级代码
                      city: selectedCity.name,
                      cityCode: selectedCity.code
                    });
                  }
                }}
              >
                <Zap size={16} color="#ffffff" className="mr-1" />
                <Text>开始游戏</Text>
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

// 地点选择器组件
const LocationPicker = ({ 
  districts, 
  selectedDistrict, 
  onSelect,
  onCancel
}: { 
  districts: District[]; 
  selectedDistrict: District | null;
  onSelect: (d: District) => void;
  onCancel: () => void;
}) => {
  const [filterType, setFilterType] = useState<District['type'] | 'all'>('all');

  const filteredDistricts = filterType === 'all' 
    ? districts 
    : districts.filter(d => d.type === filterType);

  const typeOptions: { type: District['type'] | 'all'; label: string }[] = [
    { type: 'all', label: '全部' },
    { type: 'business', label: '商圈' },
    { type: 'street', label: '街区' },
    { type: 'scenic', label: '景点' },
    { type: 'district', label: '区县' },
  ];

  return (
    <View className="p-4">
      <Text className="block text-xl font-bold text-center mb-4 text-gray-800">
        选择你要去的地方
      </Text>
      <Text className="block text-sm text-center text-gray-500 mb-4">
        第{useGameStore.getState().user?.day || 1}天 - 选择一个地点触发事件
      </Text>

      {/* 类型筛选 */}
      <ScrollView scrollX className="mb-4">
        <View className="flex gap-2">
          {typeOptions.map(opt => (
            <View 
              key={opt.type}
              className={`px-3 py-1 rounded-full ${filterType === opt.type ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setFilterType(opt.type)}
            >
              <Text className="text-xs">{opt.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 地点列表 */}
      <ScrollView scrollY className="max-h-80">
        <View className="grid grid-cols-2 gap-2">
          {filteredDistricts.map((district, index) => {
            const { icon: IconComp, color, bg } = getDistrictIcon(district.type);
            return (
              <View 
                key={index}
                className={`p-3 rounded-xl ${selectedDistrict === district ? 'bg-amber-500 text-white' : 'bg-white'} border border-gray-100`}
                onClick={() => onSelect(district)}
              >
                <View className="flex items-center gap-2">
                  <View className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center`}>
                    <IconComp size={18} color={selectedDistrict === district ? '#fff' : color} />
                  </View>
                  <View className="flex-1">
                    <Text className={`block text-sm font-medium ${selectedDistrict === district ? 'text-white' : 'text-gray-800'}`}>
                      {district.name}
                    </Text>
                    <Text className={`text-xs ${selectedDistrict === district ? 'text-amber-100' : 'text-gray-400'}`}>
                      {getDistrictTypeName(district.type)}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View className="flex gap-2 mt-4">
        <Button variant="outline" className="flex-1" onClick={onCancel}>
          <Text>取消</Text>
        </Button>
        <Button 
          className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
          disabled={!selectedDistrict}
          onClick={() => selectedDistrict && onSelect(selectedDistrict)}
        >
          <Navigation size={16} color="#ffffff" className="mr-1" />
          <Text>出发！</Text>
        </Button>
      </View>
    </View>
  );
};

// 资金展示组件
const MoneyDisplay = ({ balance, change }: { balance: number; change?: number }) => (
  <View className="flex items-center gap-2">
    <Coins size={24} color="#f59e0b" />
    <Text className="text-2xl font-bold text-amber-600">
      ¥{balance.toFixed(2)}
    </Text>
    {change !== undefined && change !== 0 && (
      <View className={`flex items-center gap-1 px-2 py-1 rounded-full ${change > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
        {change > 0 ? <TrendingUp size={14} color="#16a34a" /> : <TrendingDown size={14} color="#dc2626" />}
        <Text className={`text-sm font-medium ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change > 0 ? '+' : ''}{change}
        </Text>
      </View>
    )}
  </View>
);

// 排名卡片组件
const RankingCard = ({ 
  title, 
  icon: Icon, 
  rank, 
  total, 
  richest 
}: { 
  title: string; 
  icon: any; 
  rank: number; 
  total: number; 
  richest: { nickname: string; balance: number } | null | undefined;
}) => (
  <Card className="flex-1">
    <CardContent className="p-3">
      <View className="flex items-center gap-2 mb-2">
        <Icon size={16} color="#f59e0b" />
        <Text className="block text-sm font-medium text-gray-700">{title}</Text>
      </View>
      <Text className="block text-xl font-bold text-gray-800">
        第{rank}名 <Text className="text-sm font-normal text-gray-400">/ 共{total}人</Text>
      </Text>
      {richest && (
        <View className="mt-2 pt-2 border-t border-gray-100">
          <Text className="block text-xs text-gray-400">当前首富</Text>
          <Text className="block text-sm font-medium text-amber-600 truncate">{richest.nickname}</Text>
          <Text className="block text-xs text-amber-500">¥{richest.balance.toFixed(2)}</Text>
        </View>
      )}
    </CardContent>
  </Card>
);

// 事件卡片组件 - 系统自动选择结果展示
const EventCard = ({ 
  event, 
  locationName,
  onAutoSelect 
}: { 
  event: GameEvent; 
  locationName: string;
  onAutoSelect: () => void;
}) => {
  const [selectedOption, setSelectedOption] = useState<{ text: string; description: string; moneyChange: number } | null>(null);
  
  // 系统自动选择（使用useEffect确保只在挂载时执行一次）
  // 事件展示时间增加到4秒，让用户能看清搞笑故事内容
  useEffect(() => {
    const timer = setTimeout(() => {
      const result = getRandomOption(event);
      setSelectedOption({
        text: result.option.text,
        description: result.option.description,
        moneyChange: result.moneyChange,
      });
    }, 1500); // 1.5秒后显示结果
    return () => clearTimeout(timer);
  }, [event]);

  // 4秒后自动关闭弹窗，给用户充足时间阅读故事
  useEffect(() => {
    const closeTimer = setTimeout(() => {
      onAutoSelect();
    }, 5000); // 5秒后自动关闭
    return () => clearTimeout(closeTimer);
  }, [onAutoSelect]);
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work': return 'bg-blue-100 text-blue-600';
      case 'investment': return 'bg-purple-100 text-purple-600';
      case 'consumption': return 'bg-orange-100 text-orange-600';
      case 'opportunity': return 'bg-green-100 text-green-600';
      case 'risk': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'work': return '工作';
      case 'investment': return '投资';
      case 'consumption': return '消费';
      case 'opportunity': return '机遇';
      case 'risk': return '风险';
      default: return '随机';
    }
  };

  const getEventEmoji = (type: string) => {
    switch (type) {
      case 'work': return '💼';
      case 'investment': return '📈';
      case 'consumption': return '🛒';
      case 'opportunity': return '🍀';
      case 'risk': return '⚠️';
      default: return '🎲';
    }
  };

  return (
    <View className="flex flex-col items-center p-4">
      <View className="w-full bg-white rounded-2xl p-5 shadow-lg">
        <View className="flex items-center justify-between mb-4">
          <Badge className={getTypeColor(event.type)}>
            <Text className="text-xs">{getTypeText(event.type)}</Text>
          </Badge>
          <Text className="text-sm text-gray-400">第{useGameStore.getState().user?.day || 1}天</Text>
        </View>

        {/* 地点信息 */}
        <View className="flex items-center gap-2 mb-4 bg-amber-50 rounded-lg px-3 py-2">
          <MapPin size={14} color="#f59e0b" />
          <Text className="text-sm text-amber-700">当前位置：{locationName}</Text>
        </View>
        
        <View className="flex items-center gap-3 mb-4">
          <View className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
            <Text className="text-2xl">{getEventEmoji(event.type)}</Text>
          </View>
          <View className="flex-1">
            <Text className="block text-lg font-bold text-gray-800">{event.title}</Text>
            <Text className="block text-sm text-gray-500 mt-1">{event.description}</Text>
          </View>
        </View>

        {/* 系统自动选择结果 */}
        <View className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
          {selectedOption ? (
            <>
              <View className="flex items-center gap-2 mb-2">
                <Zap size={16} color="#f59e0b" />
                <Text className="text-sm font-medium text-amber-700">系统自动选择</Text>
              </View>
              <Text className="block text-base text-gray-800 font-medium">{selectedOption.text}</Text>
              <Text className="block text-sm text-gray-500 mt-1">{selectedOption.description}</Text>
              <View className="mt-3 pt-3 border-t border-amber-200">
                <Text className={`text-lg font-bold ${selectedOption.moneyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedOption.moneyChange >= 0 ? '+' : ''}{selectedOption.moneyChange}元
                </Text>
              </View>
            </>
          ) : (
            <View className="flex items-center justify-center py-4">
              <Text className="text-sm text-gray-500">系统正在决策中...</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

// 每日记录卡片
const DailyRecordCard = ({ record }: { record: any }) => (
  <Card className="mb-2">
    <CardContent className="p-3">
      <View className="flex items-center justify-between">
        <View className="flex items-center gap-2">
          <View className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
            <Text className="text-sm font-bold text-amber-600">第{record.day}天</Text>
          </View>
          <View>
            <Text className="block text-sm font-medium text-gray-800">{record.eventTitle}</Text>
            <Text className="block text-xs text-gray-400">{record.eventResult}</Text>
            {record.locationName && (
              <View className="flex items-center gap-1 mt-1">
                <MapPin size={10} color="#9ca3af" />
                <Text className="text-xs text-gray-400">{record.locationName}</Text>
              </View>
            )}
          </View>
        </View>
        <Text className={`text-base font-bold ${record.moneyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {record.moneyChange >= 0 ? '+' : ''}{record.moneyChange}元
        </Text>
      </View>
    </CardContent>
  </Card>
);

// 主页面组件
const IndexPage = () => {
  const { user, gameStatus, setGameStatus, updateBalance, setCurrentEvent, currentEvent, setRanking } = useGameStore();
  
  // 出生地选择状态
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [nickname, setNickname] = useState('');
  
  // UI状态
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [showRankDialog, setShowRankDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [lastChange, setLastChange] = useState<number | undefined>(undefined);
  const [currentLocation, setCurrentLocation] = useState<District | null>(null);
  
  // 获取当前城市的区域列表
  const getCurrentDistricts = (): District[] => {
    if (!user) return [];
    const province = chinaProvinces.find(p => p.code === user.location.provinceCode);
    const city = province?.cities.find(c => c.code === user.location.cityCode);
    return city?.districts || [];
  };

  // 点击随机事件按钮 - 先选择地点
  const handleGetEvent = () => {
    setCurrentLocation(null);
    setShowLocationPicker(true);
  };

  // 选择地点后触发事件
  const handleSelectLocation = (district: District) => {
    setCurrentLocation(district);
    setShowLocationPicker(false);
    
    // 根据地点类型调整事件权重
    const event = getWeightedRandomEvent();
    setCurrentEvent(event);
    setShowEventDialog(true);
    setGameStatus('EVENT');
  };

  // 处理事件选项 - 系统自动选择
  const handleAutoSelectOption = () => {
    if (!currentEvent || !user) return;
    
    const { option, moneyChange } = getRandomOption(currentEvent);
    const newBalance = user.balance + moneyChange;
    updateBalance(moneyChange, currentEvent.title, option.description, currentLocation?.name);
    setLastChange(moneyChange);
    setShowEventDialog(false);
    setCurrentEvent(null);
    
    // 同步到后端
    Network.request({
        url: '/api/game/record',
        method: 'POST',
        data: {
          userId: user.id,
          day: user.day,
          eventTitle: currentEvent.title,
          eventResult: option.description,
          moneyChange,
          balance: newBalance,
          locationName: currentLocation?.name || user.location.city,
        }
      }).then(() => {
        fetchRanking();
      });
  };
  
  // 下一天
  const handleNextDay = () => {
    if (user) {
      useGameStore.getState().syncUserData({ day: user.day + 1 });
    }
    setLastChange(undefined);
    setCurrentLocation(null);
  };
  
  // 获取排名信息
  const fetchRanking = async () => {
    if (!user) return;
    
    try {
      const res = await Network.request({
        url: '/api/game/ranking',
        method: 'GET',
        data: {
          userId: user.id,
          cityCode: user.location.cityCode,
          provinceCode: user.location.provinceCode
        }
      });
      
      if (res.data.code === 200) {
        setRanking(res.data.data);
      }
    } catch {
      // 后端未连接时使用模拟数据
      const mockRanking: RankingInfo = {
        cityRank: Math.floor(Math.random() * 100) + 1,
        cityTotal: Math.floor(Math.random() * 500) + 100,
        cityRichest: { nickname: '神秘大佬', balance: Math.floor(Math.random() * 10000) + 5000 },
        provinceRank: Math.floor(Math.random() * 1000) + 1,
        provinceTotal: Math.floor(Math.random() * 5000) + 1000,
        provinceRichest: { nickname: '省内首富', balance: Math.floor(Math.random() * 50000) + 20000 },
        nationalRank: Math.floor(Math.random() * 10000) + 1,
        nationalTotal: Math.floor(Math.random() * 50000) + 10000,
        nationalRichest: { nickname: '全国首富', balance: Math.floor(Math.random() * 1000000) + 500000 }
      };
      setRanking(mockRanking);
    }
  };
  
  // 初始化加载排名
  useEffect(() => {
    if (user && gameStatus === 'PLAYING') {
      fetchRanking();
    }
  }, [user?.id]);
  
  // 游戏结束
  const handleGameOver = () => {
    useGameStore.getState().resetGame();
    setSelectedProvince(null);
    setSelectedCity(null);
    setNickname('');
  };
  
  // 重新开始
  const handleRestart = () => {
    handleGameOver();
  };

  // 渲染出生地选择界面
  if (gameStatus === 'INIT' || !user) {
    return (
      <View className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
        <LocationSelector
          selectedProvince={selectedProvince}
          setSelectedProvince={setSelectedProvince}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          nickname={nickname}
          setNickname={setNickname}
        />
      </View>
    );
  }

  // 渲染游戏结束界面
  if (gameStatus === 'GAME_OVER') {
    return (
      <View className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50 flex flex-col items-center justify-center p-6">
        <View className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mb-6">
          <CircleAlert size={48} color="#ef4444" />
        </View>
        <Text className="text-2xl font-bold text-gray-800 mb-2">游戏结束</Text>
        <Text className="text-base text-gray-500 mb-6">你破产了，身无分文</Text>
        
        <Card className="w-full mb-6">
          <CardContent className="p-4 text-center">
            <Text className="block text-sm text-gray-500 mb-2">坚持了</Text>
            <Text className="block text-4xl font-bold text-amber-500">{user.day}天</Text>
            <Text className="block text-sm text-gray-500 mt-2">累计收入/支出</Text>
            <Text className="block text-2xl font-bold text-gray-800">¥{user.totalBalance.toFixed(2)}</Text>
          </CardContent>
        </Card>
        
        <Button 
          className="w-full bg-amber-500 hover:bg-amber-600 text-white"
          onClick={handleRestart}
        >
          <RefreshCw size={18} color="#ffffff" className="mr-2" />
          <Text>重新开始</Text>
        </Button>
      </View>
    );
  }

  // 渲染游戏主界面
  return (
    <View className="min-h-screen bg-gray-50">
      {/* 街溜子行走动画 */}
      <View className="w-full aspect-video bg-gradient-to-b from-sky-200 to-sky-100 relative overflow-hidden">
        <Video
          className="w-full h-full"
          src="https://coze-coding-project.tos.coze.site/coze_storage_7634003127947231295/video/video_generate_cgt-20260429114640-zb8m6.mp4"
          controls={false}
          autoplay={false}
          loop
          showCenterPlayBtn={false}
          showPlayBtn={false}
          enableProgressGesture={false}
          objectFit="cover"
        />
        <View className="absolute bottom-2 left-2 bg-black bg-opacity-50 rounded px-2 py-1">
          <Text className="text-white text-xs">街溜子街头漫步</Text>
        </View>
      </View>

      {/* 顶部状态栏 */}
      <View className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-4 shadow-lg">
        <View className="flex items-center justify-between mb-3">
          <View className="flex items-center gap-2">
            <View className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <User size={20} color="#f59e0b" />
            </View>
            <View>
              <Text className="block text-white font-bold">{user.nickname}</Text>
              <View className="flex items-center gap-1">
                <MapPin size={12} color="#fde68a" />
                <Text className="block text-amber-100 text-xs">{user.location.city}</Text>
              </View>
            </View>
          </View>
          <View className="flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-3 py-1">
            <Calendar size={14} color="#ffffff" />
            <Text className="text-white text-sm">第{user.day}天</Text>
          </View>
        </View>
        
        {/* 资金展示 */}
        <View className="bg-white bg-opacity-20 rounded-2xl p-4">
          <Text className="block text-amber-100 text-sm mb-1">当前资金</Text>
          <MoneyDisplay balance={user.balance} change={lastChange} />
        </View>

        {/* 当前位置显示 */}
        {currentLocation && (
          <View className="mt-2 flex items-center gap-2 bg-white bg-opacity-20 rounded-lg px-3 py-2">
            <MapPin size={14} color="#ffffff" />
            <Text className="text-white text-sm">当前位置：{currentLocation.name}</Text>
          </View>
        )}
      </View>

      {/* 主操作区 */}
      <View className="p-4">
        {/* 操作按钮 */}
        <View className="grid grid-cols-2 gap-3 mb-4">
          <Button 
            className="h-20 bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg"
            onClick={handleGetEvent}
          >
            <View className="flex flex-col items-center">
              <Zap size={28} color="#ffffff" className="mb-1" />
              <Text className="text-base font-bold">出门探索</Text>
              <Text className="text-xs opacity-80">选择地点</Text>
            </View>
          </Button>
          
          <Button 
            variant="outline"
            className="h-20 border-2 border-amber-200"
            onClick={() => setShowRankDialog(true)}
          >
            <View className="flex flex-col items-center">
              <Trophy size={28} color="#f59e0b" className="mb-1" />
              <Text className="text-base font-bold text-gray-700">排行榜</Text>
              <Text className="text-xs text-gray-400">查看排名</Text>
            </View>
          </Button>
        </View>

        {/* 快速操作 */}
        <View className="flex gap-3 mb-4">
          <Button 
            variant="outline"
            className="flex-1 h-14"
            onClick={handleNextDay}
          >
            <View className="flex items-center gap-2">
              <Clock size={18} color="#6b7280" />
              <Text className="text-sm text-gray-600">下一天</Text>
            </View>
          </Button>
          
          <Button 
            variant="outline"
            className="flex-1 h-14"
            onClick={() => setShowHistoryDialog(true)}
          >
            <View className="flex items-center gap-2">
              <Crown size={18} color="#f59e0b" />
              <Text className="text-sm text-gray-600">历史记录</Text>
            </View>
          </Button>
        </View>

        {/* 当前城市可探索地点提示 */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 mb-4">
          <CardContent className="p-4">
            <View className="flex items-start gap-3">
              <View className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Map size={20} color="#f59e0b" />
              </View>
              <View className="flex-1">
                <Text className="block text-sm font-bold text-gray-800 mb-1">{user.location.city}可探索地点</Text>
                <Text className="block text-xs text-gray-600 leading-relaxed">
                  共有 {getCurrentDistricts().length} 个可探索地点：商圈 {getCurrentDistricts().filter(d => d.type === 'business').length} 个、街区 {getCurrentDistricts().filter(d => d.type === 'street').length} 个、景点 {getCurrentDistricts().filter(d => d.type === 'scenic').length} 个、区县 {getCurrentDistricts().filter(d => d.type === 'district').length} 个
                </Text>
              </View>
            </View>
          </CardContent>
        </Card>

        {/* 游戏提示 */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-4">
            <View className="flex items-start gap-3">
              <View className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Text className="text-xl">💡</Text>
              </View>
              <View>
                <Text className="block text-sm font-bold text-gray-800 mb-1">游戏提示</Text>
                <Text className="block text-xs text-gray-600 leading-relaxed">
                  每天出门前先选择要去的地点！不同地点会遇到不同的事件。商圈适合工作和投资，街区适合消费，景点可能有惊喜！
                </Text>
              </View>
            </View>
          </CardContent>
        </Card>

        {/* 每日结算时间 */}
        <View className="mt-4 text-center">
          <Text className="text-xs text-gray-400">
            每日18:00自动结算排名
          </Text>
        </View>
      </View>

      {/* 地点选择弹窗 */}
      <Dialog open={showLocationPicker} onOpenChange={setShowLocationPicker}>
        <LocationPicker 
          districts={getCurrentDistricts()}
          selectedDistrict={currentLocation}
          onSelect={handleSelectLocation}
          onCancel={() => setShowLocationPicker(false)}
        />
      </Dialog>

      {/* 事件弹窗 */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <View className="p-4">
          {currentEvent && (
            <EventCard 
              event={currentEvent} 
              locationName={currentLocation?.name || user.location.city}
              onAutoSelect={handleAutoSelectOption}
            />
          )}
        </View>
      </Dialog>

      {/* 排名弹窗 */}
      <Dialog open={showRankDialog} onOpenChange={setShowRankDialog}>
        <View className="p-4">
          <Text className="block text-xl font-bold text-center mb-4 text-gray-800">排行榜</Text>
          
          <View className="flex gap-2 mb-4">
            <RankingCard
              title="城市"
              icon={Building}
              rank={useGameStore.getState().ranking?.cityRank || 1}
              total={useGameStore.getState().ranking?.cityTotal || 100}
              richest={useGameStore.getState().ranking?.cityRichest}
            />
            <RankingCard
              title="省份"
              icon={MapPin}
              rank={useGameStore.getState().ranking?.provinceRank || 1}
              total={useGameStore.getState().ranking?.provinceTotal || 1000}
              richest={useGameStore.getState().ranking?.provinceRichest}
            />
          </View>
          
          <Card>
            <CardContent className="p-3">
              <View className="flex items-center gap-2 mb-2">
                <Crown size={16} color="#eab308" />
                <Text className="block text-sm font-medium text-gray-700">全国排名</Text>
              </View>
              <Text className="block text-2xl font-bold text-gray-800">
                第{useGameStore.getState().ranking?.nationalRank || 1}名
                <Text className="text-sm font-normal text-gray-400"> / 共{useGameStore.getState().ranking?.nationalTotal || 10000}人</Text>
              </Text>
              {useGameStore.getState().ranking?.nationalRichest && (
                <View className="mt-2 pt-2 border-t border-gray-100">
                  <Text className="block text-xs text-gray-400">全国首富</Text>
                  <Text className="block text-sm font-bold text-yellow-600">
                    {useGameStore.getState().ranking?.nationalRichest?.nickname}
                  </Text>
                  <Text className="block text-lg font-bold text-amber-500">
                    ¥{useGameStore.getState().ranking?.nationalRichest?.balance.toFixed(2)}
                  </Text>
                </View>
              )}
            </CardContent>
          </Card>
          
          <Button 
            className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white"
            onClick={() => setShowRankDialog(false)}
          >
            <Text>知道了</Text>
          </Button>
        </View>
      </Dialog>

      {/* 历史记录弹窗 */}
      <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
        <View className="p-4 max-h-96">
          <Text className="block text-xl font-bold text-center mb-4 text-gray-800">历史记录</Text>
          
          <ScrollView scrollY className="max-h-72">
            {user.dailyRecords.length === 0 ? (
              <View className="text-center py-8">
                <Text className="block text-gray-400">还没有记录，开始你的第一天吧！</Text>
              </View>
            ) : (
              user.dailyRecords.slice().reverse().map((record, index) => (
                <DailyRecordCard key={index} record={record} />
              ))
            )}
          </ScrollView>
          
          <Button 
            className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white"
            onClick={() => setShowHistoryDialog(false)}
          >
            <Text>关闭</Text>
          </Button>
        </View>
      </Dialog>
    </View>
  );
};

export default IndexPage;
