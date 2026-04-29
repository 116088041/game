import { View, Text, ScrollView } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Crown, User, RefreshCw, TrendingUp, Users, DollarSign } from 'lucide-react-taro';
import { Network } from '@/network';
import { useGameStore } from '@/store/game-store';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
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

interface SummaryData {
  totalUsers: number;
  totalMoney: number;
  avgBalance: number;
  richestUser: { nickname: string; balance: number } | null;
  cityCount: number;
  provinceCount: number;
}

export default function Ranking() {
  const [activeTab, setActiveTab] = useState<'city' | 'province' | 'national'>('city');
  const [cityRankings, setCityRankings] = useState<RankingUser[]>([]);
  const [provinceRankings, setProvinceRankings] = useState<RankingUser[]>([]);
  const [nationalRankings, setNationalRankings] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
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

  const handleSummaryRankings = async () => {
    setSummaryLoading(true);
    try {
      const res = await Network.request({
        url: '/api/game/rankings/summary',
        method: 'POST',
      });
      
      if (res.data?.code === 200) {
        setSummaryData(res.data.data);
        setShowSummary(true);
      }
    } catch (error) {
      console.error('汇总排行榜失败:', error);
    } finally {
      setSummaryLoading(false);
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
        <View className="flex items-center justify-between mb-2">
          <View className="flex items-center gap-2">
            <Trophy size={24} color="#fff" />
            <Text className="text-xl font-bold text-white">财富排行榜</Text>
          </View>
          <View 
            className="bg-white bg-opacity-20 px-3 py-2 rounded-lg flex items-center gap-1"
            onClick={handleSummaryRankings}
          >
            <RefreshCw size={14} color="#fff" className={summaryLoading ? 'animate-spin' : ''} />
            <Text className="text-white text-xs">汇总</Text>
          </View>
        </View>
        <Text className="text-amber-100 text-sm">实时排名，每日18点更新</Text>
      </View>

      {/* 汇总弹窗 */}
      <Dialog open={showSummary} onOpenChange={setShowSummary}>
        <DialogContent className="max-w-sm mx-auto bg-white">
          <View className="text-center mb-4">
            <Text className="block text-xl font-bold text-gray-800">排行榜汇总</Text>
            <Text className="block text-sm text-gray-500 mt-1">所有玩家数据统计</Text>
          </View>
          
          {summaryData && (
            <View className="space-y-2">
              {/* 总人数 */}
              <View className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
                <View className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <Users size={20} color="#fff" />
                </View>
                <View className="flex-1">
                  <Text className="block text-sm text-gray-500">参与玩家</Text>
                  <Text className="block text-xl font-bold text-blue-600">{summaryData.totalUsers} 人</Text>
                </View>
              </View>

              {/* 总财富 */}
              <View className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
                <View className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <DollarSign size={20} color="#fff" />
                </View>
                <View className="flex-1">
                  <Text className="block text-sm text-gray-500">总财富值</Text>
                  <Text className="block text-xl font-bold text-green-600">¥{summaryData.totalMoney.toLocaleString()}</Text>
                </View>
              </View>

              {/* 平均财富 */}
              <View className="bg-purple-50 rounded-xl p-4 flex items-center gap-3">
                <View className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                  <TrendingUp size={20} color="#fff" />
                </View>
                <View className="flex-1">
                  <Text className="block text-sm text-gray-500">平均财富</Text>
                  <Text className="block text-xl font-bold text-purple-600">¥{summaryData.avgBalance.toLocaleString()}</Text>
                </View>
              </View>

              {/* 首富 */}
              {summaryData.richestUser && (
                <View className="bg-amber-50 rounded-xl p-4 flex items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
                    <Crown size={20} color="#fff" />
                  </View>
                  <View className="flex-1">
                    <Text className="block text-sm text-gray-500">首富</Text>
                    <Text className="block text-lg font-bold text-amber-600">
                      {summaryData.richestUser.nickname}
                    </Text>
                    <Text className="block text-sm text-amber-500">
                      ¥{summaryData.richestUser.balance.toLocaleString()}
                    </Text>
                  </View>
                </View>
              )}

              {/* 分布统计 */}
              <View className="flex gap-2">
                <View className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                  <Text className="block text-2xl font-bold text-gray-700">{summaryData.cityCount}</Text>
                  <Text className="block text-xs text-gray-500">覆盖城市</Text>
                </View>
                <View className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                  <Text className="block text-2xl font-bold text-gray-700">{summaryData.provinceCount}</Text>
                  <Text className="block text-xs text-gray-500">覆盖省份</Text>
                </View>
              </View>
            </View>
          )}

          <View className="mt-4">
            <Button className="w-full bg-amber-500" onClick={() => setShowSummary(false)}>
              <Text className="text-white font-medium">关闭</Text>
            </Button>
          </View>
        </DialogContent>
      </Dialog>

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
