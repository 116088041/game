import { View, Text, ScrollView } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Crown, User } from 'lucide-react-taro';
import { Network } from '@/network';
import { useGameStore } from '@/store/game-store';
import './index.css';

interface RankingUser {
  userId: string;
  nickname: string;
  balance: number;
  day: number;
  city: string;
  province: string;
  rank: number;
  rankType: 'city' | 'province' | 'national';
}

export default function Ranking() {
  const [activeTab, setActiveTab] = useState<'city' | 'province' | 'national'>('city');
  const [cityRankings, setCityRankings] = useState<RankingUser[]>([]);
  const [provinceRankings, setProvinceRankings] = useState<RankingUser[]>([]);
  const [nationalRankings, setNationalRankings] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useGameStore((state) => state.user);

  useEffect(() => {
    fetchRankings();
  }, [activeTab]);

  const fetchRankings = async () => {
    setLoading(true);
    try {
      const res = await Network.request({
        url: '/api/game/rankings',
        method: 'GET',
      });
      
      if (res.data?.code === 200) {
        setCityRankings(res.data.data?.cityRankings || []);
        setProvinceRankings(res.data.data?.provinceRankings || []);
        setNationalRankings(res.data.data?.nationalRankings || []);
      }
    } catch (error) {
      console.error('获取排行榜失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankings = () => {
    switch (activeTab) {
      case 'city': return cityRankings;
      case 'province': return provinceRankings;
      case 'national': return nationalRankings;
      default: return [];
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown size={20} color="#fbbf24" />;
    if (rank === 2) return <Medal size={18} color="#9ca3af" />;
    if (rank === 3) return <Medal size={18} color="#cd7f32" />;
    return <Text className="text-gray-400 font-medium w-6 text-center">{rank}</Text>;
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-amber-100 to-yellow-100 border-amber-300';
    if (rank === 2) return 'bg-gradient-to-r from-gray-50 to-slate-100 border-gray-300';
    if (rank === 3) return 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-300';
    return 'bg-white border-gray-200';
  };

  const currentRankings = getRankings();
  const userRank = currentRankings.find(r => r.userId === user?.id);

  return (
    <View className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* 头部 */}
      <View className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-6">
        <View className="flex items-center gap-2 mb-2">
          <Trophy size={24} color="#fff" />
          <Text className="text-xl font-bold text-white">财富排行榜</Text>
        </View>
        <Text className="text-amber-100 text-sm">实时排名，每日18点更新</Text>
      </View>

      {/* 我的排名卡片 */}
      {user && (
        <View className="px-4 -mt-4">
          <Card className="bg-white shadow-lg border-amber-200">
            <CardContent className="p-4">
              <View className="flex items-center justify-between">
                <View className="flex items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <User size={20} color="#f59e0b" />
                  </View>
                  <View>
                    <Text className="block text-gray-800 font-medium">{user.nickname}</Text>
                    <Text className="block text-sm text-gray-500">
                      第{userRank?.rank || '-'}名
                    </Text>
                  </View>
                </View>
                <View className="text-right">
                  <Text className="block text-2xl font-bold text-amber-600">
                    ¥{user.balance.toLocaleString()}
                  </Text>
                  <Text className="block text-xs text-gray-400">当前财富</Text>
                </View>
              </View>
            </CardContent>
          </Card>
        </View>
      )}

      {/* 切换标签 */}
      <View className="px-4 py-4">
        <View className="flex bg-white rounded-xl p-1 shadow-sm">
          {[
            { key: 'city', label: '城市排行', icon: '🏙️' },
            { key: 'province', label: '省份排行', icon: '🗺️' },
            { key: 'national', label: '全国排行', icon: '🌐' },
          ].map((tab) => (
            <View
              key={tab.key}
              className={`flex-1 py-2 rounded-lg text-center transition-all ${
                activeTab === tab.key
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab(tab.key as any)}
            >
              <Text className={`text-sm font-medium ${activeTab === tab.key ? 'text-white' : ''}`}>
                {tab.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* 排行榜列表 */}
      <ScrollView scrollY className="px-4 pb-24" style={{ height: 'calc(100vh - 300px)' }}>
        {loading ? (
          <View className="flex items-center justify-center py-12">
            <Text className="text-gray-400">加载中...</Text>
          </View>
        ) : currentRankings.length === 0 ? (
          <View className="flex flex-col items-center justify-center py-12">
            <Text className="text-gray-400 mb-2">暂无排行数据</Text>
            <Text className="text-sm text-gray-400">快去游戏赚取财富吧！</Text>
          </View>
        ) : (
          currentRankings.map((item) => (
            <Card 
              key={item.userId} 
              className={`mb-3 border-2 ${getRankStyle(item.rank)} ${
                item.userId === user?.id ? 'ring-2 ring-amber-500' : ''
              }`}
            >
              <CardContent className="p-4">
                <View className="flex items-center gap-3">
                  {/* 排名 */}
                  <View className="w-8 flex items-center justify-center">
                    {getRankIcon(item.rank)}
                  </View>

                  {/* 用户信息 */}
                  <View className="flex-1">
                    <View className="flex items-center gap-2">
                      <Text className="block text-gray-800 font-medium">
                        {item.nickname}
                        {item.userId === user?.id && (
                          <Badge className="ml-2 bg-amber-100 text-amber-700 text-xs">你</Badge>
                        )}
                      </Text>
                    </View>
                    <Text className="block text-xs text-gray-400 mt-1">
                      {item.city} · 第{item.day}天
                    </Text>
                  </View>

                  {/* 财富 */}
                  <View className="text-right">
                    <Text className={`block text-lg font-bold ${
                      item.rank <= 3 ? 'text-amber-600' : 'text-gray-700'
                    }`}
                    >
                      ¥{item.balance.toLocaleString()}
                    </Text>
                    {item.rank <= 3 && (
                      <Badge className={`text-xs ${
                        item.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                        item.rank === 2 ? 'bg-gray-100 text-gray-600' :
                        'bg-orange-100 text-orange-600'
                      }`}
                      >
                        {item.rank === 1 ? '首富' : item.rank === 2 ? '榜眼' : '探花'}
                      </Badge>
                    )}
                  </View>
                </View>
              </CardContent>
            </Card>
          ))
        )}
      </ScrollView>
    </View>
  );
}
