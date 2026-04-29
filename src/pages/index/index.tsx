import { View, Text, ScrollView, Video } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import Taro from '@tarojs/taro';
import { 
  Coins, MapPin, TrendingUp, 
  TrendingDown, CircleAlert, Zap, Building,
  RefreshCw, User, Map, Navigation, Store, Heart
} from 'lucide-react-taro';
import { chinaProvinces, type Province, type City, type District } from '@/data/china-cities';
import { getWeightedRandomEventByMoral, type GameEvent, type GameEventOption } from '@/data/game-events';
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
  onSelect
}: { 
  districts: District[]; 
  selectedDistrict: District | null;
  onSelect: (d: District) => void;
}) => {
  return (
    <View className="p-4">
      <Text className="block text-xl font-bold text-center mb-4 text-gray-800">
        选择你要去的地方
      </Text>
      <Text className="block text-sm text-center text-gray-500 mb-4">
        选择一个地点触发事件（已触发{useGameStore.getState().user?.dailyRecords?.length || 0}次）
      </Text>

      {/* 地点列表 */}
      <ScrollView scrollY className="max-h-80">
        <View className="grid grid-cols-2 gap-2">
          {districts.map((district, index) => {
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

      <View className="mt-4">
        <Button 
          className="w-full bg-amber-500 hover:bg-amber-600 text-white"
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
const MoneyDisplay = ({ balance, change }: { balance: number; change?: number | null }) => {
  const showChange = change !== undefined && change !== null && change !== 0;
  return (
    <View className="h-8 flex items-center gap-2">
      <Coins size={20} color="#f59e0b" />
      <Text className="text-xl font-bold text-white">
        ¥{balance.toFixed(0)}
      </Text>
      {showChange && (
        <View className={`flex items-center gap-1 px-2 py-1 rounded-full ${change > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
          {change > 0 ? <TrendingUp size={12} color="#16a34a" /> : <TrendingDown size={12} color="#dc2626" />}
          <Text className={`text-xs font-medium ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change > 0 ? '+' : ''}{change}
          </Text>
        </View>
      )}
    </View>
  );
};

// 事件卡片组件 - 用户选择后显示结果
const EventCard = ({ 
  event, 
  locationName,
  onSelect,
  onClose,
  selectedOption
}: { 
  event: GameEvent; 
  locationName: string;
  onSelect: (option: GameEventOption, moneyChange: number) => void;
  onClose: () => void;
  selectedOption: { option: GameEventOption; moneyChange: number } | null;
}) => {
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

  // 计算每个选项的金额（但不显示）
  const getOptionMoneyChange = (option: GameEventOption): number => {
    const percent = option.percentMin + Math.random() * (option.percentMax - option.percentMin);
    return Math.round(100 * (percent / 100));
  };

  // 过滤描述中的数字
  const filterNumbers = (text: string): string => {
    return text.replace(/\d+/g, 'X');
  };

  return (
    <View className="flex flex-col items-center p-4">
      <View className="w-full bg-white rounded-2xl p-5 shadow-lg">
        <View className="flex items-center justify-between mb-4">
          <Badge className={getTypeColor(event.type)}>
            <Text className="text-xs">{getTypeText(event.type)}</Text>
          </Badge>
          <Text className="text-sm text-gray-400">第{useGameStore.getState().user?.dailyRecords?.length || 0}次</Text>
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
            <Text className="block text-sm text-gray-500 mt-1">{filterNumbers(event.description)}</Text>
          </View>
        </View>

        {/* 选择结果 - 用户选择后显示 */}
        {selectedOption ? (
          <View className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
            <Text className="block text-base text-gray-800 font-medium">{filterNumbers(selectedOption.option.description)}</Text>
            <View className="mt-3 pt-3 border-t border-amber-200">
              <View className="flex items-center justify-between mb-2">
                <View className="flex items-center gap-2">
                  <Text className={`text-lg font-bold ${selectedOption.moneyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedOption.moneyChange >= 0 ? '进账 +' : '支出 -'}{Math.abs(selectedOption.moneyChange)}
                  </Text>
                  <View className="flex items-center gap-1">
                    <Heart size={14} color={selectedOption.option.moralValue >= 0 ? '#10b981' : '#ef4444'} />
                    <Text className={`text-sm ${selectedOption.option.moralValue >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {selectedOption.option.moralValue >= 0 ? '+' : ''}{selectedOption.option.moralValue}道德
                    </Text>
                  </View>
                </View>
                <Text className="text-xs text-amber-600" onClick={onClose}>
                  点击关闭
                </Text>
              </View>
            </View>
          </View>
        ) : (
          /* 选项列表 - 用户选择 */
          <View className="mt-4">
            <Text className="block text-base font-medium text-gray-700 mb-3">请选择你的行动：</Text>
            {event.options.map((option, index) => (
              <View 
                key={index}
                className="mb-3 p-4 bg-gray-50 rounded-xl border border-gray-200 active:bg-gray-100"
                onClick={() => {
                  const moneyChange = getOptionMoneyChange(option);
                  onSelect(option, moneyChange);
                }}
              >
                <Text className="block text-base text-gray-800 font-medium">{option.text}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

// 主页面组件
const IndexPage = () => {
  const { user, gameStatus, setGameStatus, updateBalance, setCurrentEvent, currentEvent, setRanking, resetGame } = useGameStore();
  
  // 出生地选择状态
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [nickname, setNickname] = useState('');
  
  // UI状态
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [lastChange, setLastChange] = useState<number | undefined>(undefined);
  const [currentLocation, setCurrentLocation] = useState<District | null>(null);
  const [currentEventResult, setCurrentEventResult] = useState<{ option: GameEventOption; moneyChange: number } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  // 获取当前城市的区域列表
  const getCurrentDistricts = (): District[] => {
    if (!user) return [];
    const province = chinaProvinces.find(p => p.code === user.location.provinceCode);
    const city = province?.cities.find(c => c.code === user.location.cityCode);
    return city?.districts || [];
  };

  // 选择地点后触发事件
  const handleSelectLocation = (district: District) => {
    setCurrentLocation(district);
    setShowLocationPicker(false);
    setCurrentEventResult(null); // 重置结果
    
    // 根据道德值获取随机事件
    const moralValue = user?.moralValue || 0;
    const event = getWeightedRandomEventByMoral(moralValue);
    setCurrentEvent(event);
    
    // 立即显示事件弹窗，让用户选择
    setShowEventDialog(true);
    setGameStatus('EVENT');
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
            <Text className="block text-4xl font-bold text-amber-500">{user.dailyRecords.length}次</Text>
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

  // 处理事件弹窗关闭逻辑
  const handleEventDialogClose = () => {
    if (!currentEventResult || !user) return;
    
    const { option, moneyChange } = currentEventResult;
    const newBalance = user.balance + moneyChange;
    const moralChange = option.moralValue;
    
    // 更新余额和道德值
    updateBalance(moneyChange, moralChange, currentEvent?.title || '', option.description, currentLocation?.name);
    setLastChange(moneyChange);
    
    // 同步到后端
    Network.request({
      url: '/api/game/record',
      method: 'POST',
      data: {
        userId: user.id,
        eventTitle: currentEvent?.title || '',
        eventResult: option.description,
        moneyChange,
        moralChange,
        balance: newBalance,
        moralValue: user.moralValue + moralChange,
        locationName: currentLocation?.name || user.location.city,
      }
    });
    
    // 检查余额是否为负数，是则重新开始
    if (newBalance <= 0) {
      setGameStatus('GAME_OVER');
      Taro.showModal({
        title: '破产了！',
        content: '你的钱花光了，游戏结束！是否重新开始？',
        confirmText: '重新开始',
        cancelText: '查看排名',
        success: (res) => {
          if (res.confirm) {
            // 重新开始
            useGameStore.getState().setUser(null);
            useGameStore.setState({ gameStatus: 'INIT' });
          }
        }
      });
    }
    
    setCurrentEvent(null);
    setCurrentEventResult(null);
    setShowEventDialog(false);
  };

  // 渲染游戏主界面
  return (
    <View className="min-h-screen bg-gray-50">
      {/* 街溜子行走动画 */}
      <View className="w-full aspect-video bg-gradient-to-b from-sky-200 to-sky-100 relative overflow-hidden">
        {Taro.getEnv() === Taro.ENV_TYPE.WEAPP || Taro.getEnv() === Taro.ENV_TYPE.TT ? (
          <Video
            className="w-full h-full"
            src="https://coze-coding-project.tos.coze.site/coze_storage_7634003127947231295/video/video_generate_cgt-20260429154618-b8cq7.mp4?sign=1808984826-c9028a0e60-0-9ffa71eaaa570badf193c75d79802d44f0866cc45c98d8e69195442b4aed7baa"
            controls={false}
            autoplay={false}
            loop
            showCenterPlayBtn={false}
            showPlayBtn={false}
            enableProgressGesture={false}
            objectFit="cover"
          />
        ) : (
          <View className="w-full h-full flex items-center justify-center bg-gradient-to-b from-sky-300 to-sky-200">
            <View className="text-center">
              <View className="text-6xl mb-2">🚶</View>
              <Text className="block text-sky-600 text-sm">街头漫步</Text>
            </View>
          </View>
        )}
        <View className="absolute bottom-2 left-2 bg-black bg-opacity-50 rounded px-2 py-1">
          <Text className="text-white text-xs">街头漫步</Text>
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
          {/* 道德值和重新开始 */}
          <View className="flex items-center gap-2">
            <View className="flex items-center gap-2 bg-amber-500 rounded-full px-3 py-1">
              <Heart size={14} color="#ffffff" />
              <Text className="text-white text-sm font-bold">
                {user?.moralValue ?? 50}
              </Text>
            </View>
            <Button 
              variant="ghost" 
              size="sm"
              className="p-1 h-7 min-w-7"
              onClick={() => setShowResetConfirm(true)}
            >
              <RefreshCw size={14} color="#ffffff" />
            </Button>
          </View>
        </View>
        
        {/* 资金展示 */}
        <MoneyDisplay balance={user.balance} change={lastChange} />

        {/* 当前位置显示 */}
        {currentLocation && (
          <View className="mt-2 flex items-center gap-2 bg-white bg-opacity-20 rounded-lg px-3 py-2">
            <MapPin size={14} color="#ffffff" />
            <Text className="text-white text-sm">当前位置：{currentLocation.name}</Text>
          </View>
        )}
      </View>

      {/* 主操作区 - 简洁版 */}
      <View className="p-4">
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
        />
      </Dialog>

      {/* 事件弹窗 - 用户选择后手动关闭 */}
      <Dialog open={showEventDialog} onOpenChange={(open) => {
        // 只有在选择后（currentEventResult 不为空）才允许关闭
        if (!open && currentEventResult) {
          // 执行关闭后的结算逻辑
          handleEventDialogClose();
        } else if (!open && !currentEventResult) {
          // 用户还没选择，阻止关闭
          setShowEventDialog(true);
        }
      }}
      >
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          {currentEvent && (
            <EventCard
              event={currentEvent}
              locationName={currentLocation?.name || user.location.city}
              selectedOption={currentEventResult}
              onSelect={(option, moneyChange) => {
                // 用户选择后设置结果，等待用户手动关闭
                setCurrentEventResult({ option, moneyChange });
              }}
              onClose={handleEventDialogClose}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* 重新开始确认弹窗 */}
      <AlertDialog open={showResetConfirm} onOpenChange={setShowResetConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认重新开始？</AlertDialogTitle>
            <AlertDialogDescription>
              重新开始将会清除所有进度，你将从100块钱重新开始游戏。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowResetConfirm(false)}>
              取消
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                resetGame();
                setShowResetConfirm(false);
                setLastChange(undefined);
                setCurrentLocation(null);
              }}
            >
              确认重置
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </View>
  );
};

export default IndexPage;
