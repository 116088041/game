import { View, Text, Input, ScrollView } from '@tarojs/components';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Taro from '@tarojs/taro';
import { MapPin, Search, ChevronRight, ChevronLeft, Play } from 'lucide-react-taro';
import { chinaProvinces, type Province, type City, type District } from '@/data/china-cities';

const getInputValue = (e: any): string => {
  if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP || Taro.getEnv() === Taro.ENV_TYPE.TT) {
    return e.detail.value;
  }
  return e.target?.value || '';
};

const getDistrictIcon = (type: District['type']) => {
  switch (type) {
    case 'district': return { color: '#6b7280', bg: 'bg-gray-100', label: '区县' };
    case 'business': return { color: '#f59e0b', bg: 'bg-amber-100', label: '商圈' };
    case 'scenic': return { color: '#10b981', bg: 'bg-green-100', label: '景点' };
    case 'street': return { color: '#8b5cf6', bg: 'bg-purple-100', label: '街区' };
    default: return { color: '#6b7280', bg: 'bg-gray-100', label: '地点' };
  }
};

interface LocationSelectorProps {
  selectedProvince: Province | null;
  setSelectedProvince: (p: Province | null) => void;
  selectedCity: City | null;
  setSelectedCity: (c: City | null) => void;
  selectedDistrict: District | null;
  setSelectedDistrict: (d: District | null) => void;
  nickname: string;
  setNickname: (n: string) => void;
  onComplete: () => void;
}

export const LocationSelector = ({
  selectedProvince, setSelectedProvince,
  selectedCity, setSelectedCity,
  selectedDistrict, setSelectedDistrict,
  nickname, setNickname,
  onComplete
}: LocationSelectorProps) => {
  const [step, setStep] = useState<'nickname' | 'province' | 'city' | 'district'>('nickname');
  const [searchText, setSearchText] = useState('');

  const filteredProvinces = chinaProvinces.filter(p =>
    p.name.includes(searchText) || p.code.includes(searchText)
  );

  const filteredCities = selectedProvince?.cities.filter(c =>
    c.name.includes(searchText) || c.code.includes(searchText)
  ) || [];

  const canComplete = nickname.trim() && selectedProvince && selectedCity && selectedDistrict;

  const handleNicknameNext = () => {
    if (nickname.trim()) {
      setSearchText('');
      setStep('province');
    }
  };

  const handleProvinceSelect = (p: Province) => {
    setSelectedProvince(p);
    setSelectedCity(null);
    setSelectedDistrict(null);
    setSearchText('');
    setStep('city');
  };

  const handleCitySelect = (c: City) => {
    setSelectedCity(c);
    setSelectedDistrict(null);
    setSearchText('');
    setStep('district');
  };

  return (
    <View className="flex flex-col h-full px-4 py-6">
      {/* Step indicator */}
      <View className="flex items-center justify-center gap-1.5 mb-6">
        {(['nickname', 'province', 'city', 'district'] as const).map((s, i) => {
          const done = (s === 'nickname' && nickname) ||
            (s === 'province' && selectedProvince) ||
            (s === 'city' && selectedCity) ||
            (s === 'district' && selectedDistrict);
          const active = step === s;
          return (
            <View key={s} className="flex items-center gap-1.5">
              <View className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                ${active ? 'bg-amber-500 text-white' : done ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                <Text>{done && !active ? '✓' : i + 1}</Text>
              </View>
              {i < 3 && <View className={`w-5 h-0.5 ${done ? 'bg-green-300' : 'bg-gray-200'}`} />}
            </View>
          );
        })}
      </View>

      {/* Nickname step */}
      {step === 'nickname' && (
        <View className="flex-1 flex flex-col">
          <Text className="text-2xl font-bold text-center mb-2">选择你的身份</Text>
          <Text className="text-sm text-gray-500 text-center mb-8">从100元起步，逆袭成为全国首富</Text>
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <Text className="text-sm font-semibold text-gray-700 mb-2">昵称</Text>
            <Input
              className="w-full border border-gray-200 rounded-lg p-3 text-base"
              placeholder="输入你的昵称"
              value={nickname}
              onInput={(e) => setNickname(getInputValue(e))}
              maxlength={12}
            />
          </View>
          <View className="flex-1" />
          <Button
            className="w-full bg-amber-500 hover:bg-amber-600 text-white"
            size="lg"
            onClick={handleNicknameNext}
            disabled={!nickname.trim()}
          >
            <Text>下一步</Text>
            <ChevronRight size={18} color="#fff" />
          </Button>
        </View>
      )}

      {/* Province step */}
      {step === 'province' && (
        <View className="flex-1 flex flex-col">
          <View className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm" onClick={() => setStep('nickname')}>
              <ChevronLeft size={18} color="#6b7280" />
            </Button>
            <Text className="text-lg font-bold">选择省份</Text>
          </View>
          <View className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mb-4">
            <Search size={16} color="#9ca3af" />
            <Input
              className="flex-1 ml-2 text-sm bg-transparent"
              placeholder="搜索省份"
              value={searchText}
              onInput={(e) => setSearchText(getInputValue(e))}
            />
          </View>
          <ScrollView scrollY className="flex-1" style={{ height: '400px' }}>
            <View className="grid grid-cols-2 gap-3">
              {filteredProvinces.map(p => (
                <View
                  key={p.code}
                  className={`p-4 rounded-xl border-2 ${selectedProvince?.code === p.code ? 'border-amber-500 bg-amber-50' : 'border-gray-100 bg-white'} active:scale-95`}
                  onClick={() => handleProvinceSelect(p)}
                >
                  <MapPin size={18} color={selectedProvince?.code === p.code ? '#f59e0b' : '#9ca3af'} />
                  <Text className="block mt-1 text-sm font-semibold">{p.name}</Text>
                  <Text className="text-xs text-gray-400">{p.cities.length} 个城市</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* City step */}
      {step === 'city' && selectedProvince && (
        <View className="flex-1 flex flex-col">
          <View className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm" onClick={() => { setStep('province'); setSearchText(''); }}>
              <ChevronLeft size={18} color="#6b7280" />
            </Button>
            <View>
              <Text className="text-lg font-bold">{selectedProvince.name}</Text>
              <Text className="text-xs text-gray-400">选择城市</Text>
            </View>
          </View>
          <View className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mb-4">
            <Search size={16} color="#9ca3af" />
            <Input
              className="flex-1 ml-2 text-sm bg-transparent"
              placeholder="搜索城市"
              value={searchText}
              onInput={(e) => setSearchText(getInputValue(e))}
            />
          </View>
          <ScrollView scrollY className="flex-1" style={{ height: '400px' }}>
            <View className="grid grid-cols-2 gap-3">
              {filteredCities.map(c => (
                <View
                  key={c.code}
                  className={`p-4 rounded-xl border-2 ${selectedCity?.code === c.code ? 'border-amber-500 bg-amber-50' : 'border-gray-100 bg-white'} active:scale-95`}
                  onClick={() => handleCitySelect(c)}
                >
                  <Text className="block text-sm font-semibold">{c.name}</Text>
                  <Text className="text-xs text-gray-400">{c.districts.length} 个地点</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* District step */}
      {step === 'district' && selectedCity && (
        <View className="flex-1 flex flex-col">
          <View className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm" onClick={() => { setStep('city'); setSearchText(''); }}>
              <ChevronLeft size={18} color="#6b7280" />
            </Button>
            <View>
              <Text className="text-lg font-bold">{selectedCity.name}</Text>
              <Text className="text-xs text-gray-400">选择出生地</Text>
            </View>
          </View>
          <ScrollView scrollY className="flex-1" style={{ height: '400px' }}>
            <View className="grid grid-cols-2 gap-3">
              {selectedCity.districts.map(d => {
                const iconStyle = getDistrictIcon(d.type);
                return (
                  <View
                    key={d.name}
                    className={`p-4 rounded-xl border-2 ${selectedDistrict?.name === d.name ? 'border-amber-500 bg-amber-50' : 'border-gray-100 bg-white'} active:scale-95`}
                    onClick={() => setSelectedDistrict(d)}
                  >
                    <View className="flex items-center gap-2">
                      <Badge variant="outline" className={iconStyle.bg}>
                        <Text style={{ color: iconStyle.color, fontSize: '10px' }}>{iconStyle.label}</Text>
                      </Badge>
                    </View>
                    <Text className="block mt-2 text-sm font-semibold">{d.name}</Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
          <Button
            className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white"
            size="lg"
            onClick={onComplete}
            disabled={!canComplete}
          >
            <Play size={18} color="#fff" />
            <Text className="ml-2 text-white font-semibold">开始游戏</Text>
          </Button>
        </View>
      )}
    </View>
  );
};

export default LocationSelector;
