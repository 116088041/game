import { View, Text, ScrollView } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Crown, User, RefreshCw, TrendingUp, ArrowDown, ArrowUp } from 'lucide-react-taro';
import { Network } from '@/network';
import { useGameStore } from '@/store/game-store';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import './index.css';

interface SummaryData {
  totalUsers: number;
  totalMoney: number;
  avgBalance: number;
  richestUser: { nickname: string; balance: number } | null;
  cityCount: number;
  provinceCount: number;
}

interface RankingResponse {
  rankings: any[];
  myRank: number;
  myTotal: number;
}

export default function Ranking() {
  const [activeTab, setActiveTab] = useState<'expense' | 'income'>('expense');
  const [expenseRankings, setExpenseRankings] = useState<RankingResponse | null>(null);
  const [incomeRankings, setIncomeRankings] = useState<RankingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const user = useGameStore((state) => state.user);

  useEffect(() => {
    if (!user) return;
    const loadData = async () => {
      await syncUserToServer();
      await Promise.all([fetchExpenseRankings(), fetchIncomeRankings()]);
    };
    loadData();
  }, [user]);

  const syncUserToServer = async () => {
    if (!user) return;
    try {
      await Network.request({
        url: '/api/game/user',
        method: 'POST',
        data: {
          userId: user.id,
          nickname: user.nickname,
          cityCode: user.location.cityCode,
          cityName: user.location.city,
          provinceCode: user.location.provinceCode,
          provinceName: user.location.province,
          district: user.location.district,
          districtType: user.location.districtType,
          balance: user.balance,
          karmaValue: user.karmaValue,
          totalIncome: user.totalIncome,
          totalExpense: user.totalExpense,
          day: user.dailyRecords.length || 1,
        },
      });
    } catch (e) {
      // 静默失败
    }
  };

  const fetchExpenseRankings = async () => {
    setLoading(true);
    try {
      const res = await Network.request({
        url: `/api/game/rankings/expense?userId=${user?.id || ''}`,
        method: 'GET',
      });
      if (res.data?.code === 200) {
        setExpenseRankings(res.data?.data);
      }
    } catch (error) {
      console.error('获取败家之王排行榜失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchIncomeRankings = async () => {
    setLoading(true);
    try {
      const res = await Network.request({
        url: `/api/game/rankings/income?userId=${user?.id || ''}`,
        method: 'GET',
      });
      if (res.data?.code === 200) {
        setIncomeRankings(res.data?.data);
      }
    } catch (error) {
      console.error('获取首富排行失败:', error);
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

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown size={20} color="#fbbf24" />;
    if (rank === 2) return <Medal size={18} color="#94a3b8" />;
    if (rank === 3) return <Medal size={18} color="#cd7f32" />;
    return <Text className="text-stone-400 font-medium w-6 text-center">{rank}</Text>;
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200';
    if (rank === 2) return 'bg-gradient-to-r from-stone-50 to-stone-100 border-stone-200';
    if (rank === 3) return 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200';
    return 'bg-white border-orange-50';
  };

  const currentRankingData = activeTab === 'expense' ? expenseRankings : incomeRankings;
  const isExpense = activeTab === 'expense';

  return (
    <View className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 flex flex-col">
      {/* 头部 */}
      <View className="bg-gradient-to-r from-orange-500 to-amber-500 px-4 pt-4 pb-6 flex-shrink-0">
        <View className="flex items-center justify-between mb-2">
          <View className="flex items-center gap-2">
            <Trophy size={24} color="#fff" />
            <Text className="text-xl font-bold text-white">财富排行榜</Text>
          </View>
          <View
            className="bg-white/20 px-3 py-2 rounded-lg flex items-center gap-1"
            onClick={handleSummaryRankings}
          >
            <RefreshCw size={14} color="#fff" className={summaryLoading ? 'animate-spin' : ''} />
            <Text className="text-white text-xs">汇总</Text>
          </View>
        </View>
        <Text className="text-orange-100 text-sm">实时排名，数据每小时更新</Text>
      </View>

      {/* 我的排名卡片 */}
      {user && currentRankingData && (
        <View className="px-4 pt-4 flex-shrink-0">
          <Card className={`bg-white shadow-sm border-2 ${isExpense ? 'border-rose-200' : 'border-emerald-200'}`}>
            <CardContent className="p-4">
              <View className="flex items-center justify-between">
                <View className="flex items-center gap-3 min-w-0 flex-1">
                  <View className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isExpense ? 'bg-rose-100' : 'bg-emerald-100'}`}>
                    {isExpense ? (
                      <ArrowDown size={20} color="#e11d48" />
                    ) : (
                      <ArrowUp size={20} color="#10b981" />
                    )}
                  </View>
                  <View className="min-w-0 flex-1">
                    <Text className="block text-stone-800 font-medium truncate">{user.nickname}</Text>
                    <Text className="block text-sm text-stone-400">
                      第{currentRankingData.myRank || '-'}名 / 共{currentRankingData.myTotal || 0}人
                    </Text>
                  </View>
                </View>
                <View className="text-right flex-shrink-0 ml-3">
                  <Text className={`block text-2xl font-bold ${isExpense ? 'text-rose-600' : 'text-emerald-600'}`}>
                    ¥{(isExpense ? user.totalExpense : user.totalIncome).toLocaleString()}
                  </Text>
                  <Text className="block text-xs text-stone-400">{isExpense ? '总支出' : '总收入'}</Text>
                </View>
              </View>
            </CardContent>
          </Card>
        </View>
      )}

      {/* 切换标签 */}
      <View className="px-4 py-4 flex-shrink-0">
        <View className="flex bg-white rounded-xl p-1 shadow-sm border border-orange-100">
          <View
            className={`flex-1 py-2.5 rounded-lg text-center transition-all ${isExpense ? 'bg-rose-500 text-white shadow-md' : 'text-stone-500'}`}
            onClick={() => setActiveTab('expense')}
          >
            <Text className={`text-sm font-medium ${isExpense ? 'text-white' : ''}`}>败家之王</Text>
          </View>
          <View
            className={`flex-1 py-2.5 rounded-lg text-center transition-all ${!isExpense ? 'bg-emerald-500 text-white shadow-md' : 'text-stone-500'}`}
            onClick={() => setActiveTab('income')}
          >
            <Text className={`text-sm font-medium ${!isExpense ? 'text-white' : ''}`}>首富排行</Text>
          </View>
        </View>
      </View>

      {/* 排行榜列表 */}
      <ScrollView scrollY className="flex-1 px-4 pb-16">
        {loading ? (
          <View className="flex items-center justify-center py-12">
            <Text className="text-stone-400">加载中...</Text>
          </View>
        ) : !currentRankingData || currentRankingData.rankings.length === 0 ? (
          <View className="flex flex-col items-center justify-center py-12">
            <Text className="text-stone-400 mb-2">暂无排行数据</Text>
            <Text className="text-sm text-stone-400">快去游戏积累数据吧！</Text>
          </View>
        ) : (
          currentRankingData.rankings.map((item: any) => (
            <Card
              key={item.userId}
              className={`mb-3 border-2 ${getRankStyle(item.rank)} ${item.userId === user?.id ? `ring-2 ${isExpense ? 'ring-rose-400' : 'ring-emerald-400'}` : ''}`}
            >
              <CardContent className="p-4">
                <View className="flex items-center gap-3">
                  <View className="w-8 flex items-center justify-center flex-shrink-0">
                    {getRankIcon(item.rank)}
                  </View>
                  <View className="flex-1 min-w-0">
                    <View className="flex items-center gap-2">
                      <Text className="block text-stone-800 font-medium truncate">{item.nickname}</Text>
                      {item.rank <= 3 && (
                        <Badge variant="secondary" className="text-xs flex-shrink-0">TOP{item.rank}</Badge>
                      )}
                    </View>
                    <View className="flex items-center gap-2 mt-1">
                      <Text className="text-xs text-stone-400 truncate">{item.city}</Text>
                      <Text className="text-xs text-stone-300 flex-shrink-0">|</Text>
                      <Text className="text-xs text-stone-400 flex-shrink-0">余额¥{(item.currentBalance || 0).toLocaleString()}</Text>
                    </View>
                  </View>
                  <View className="text-right flex-shrink-0 ml-2">
                    <Text className={`block text-lg font-bold ${isExpense ? 'text-rose-600' : 'text-emerald-600'}`}>
                      ¥{(isExpense ? item.totalExpense : item.totalIncome).toLocaleString()}
                    </Text>
                    {item.rank <= 3 && (
                      <Text className={`text-xs ${isExpense ? 'text-rose-500' : 'text-emerald-500'}`}>
                        {isExpense
                          ? (item.rank === 1 ? '败家王' : item.rank === 2 ? '败家仔' : '败家子')
                          : (item.rank === 1 ? '首富' : item.rank === 2 ? '土豪' : '富翁')
                        }
                      </Text>
                    )}
                  </View>
                </View>
              </CardContent>
            </Card>
          ))
        )}
      </ScrollView>

      {/* 汇总弹窗 */}
      <Dialog open={showSummary} onOpenChange={setShowSummary}>
        <DialogContent className="max-w-sm mx-auto bg-white">
          <View className="text-center mb-4">
            <Text className="block text-xl font-bold text-stone-800">排行榜汇总</Text>
            <Text className="block text-sm text-stone-500 mt-1">所有玩家数据统计</Text>
          </View>

          {summaryData && (
            <View className="space-y-2">
              <View className="bg-orange-50 rounded-xl p-4 flex items-center gap-3">
                <View className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                  <User size={20} color="#fff" />
                </View>
                <View className="flex-1">
                  <Text className="block text-sm text-stone-500">参与玩家</Text>
                  <Text className="block text-xl font-bold text-orange-600">{summaryData.totalUsers} 人</Text>
                </View>
              </View>

              <View className="bg-emerald-50 rounded-xl p-4 flex items-center gap-3">
                <View className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Trophy size={20} color="#fff" />
                </View>
                <View className="flex-1">
                  <Text className="block text-sm text-stone-500">总财富值</Text>
                  <Text className="block text-xl font-bold text-emerald-600">¥{summaryData.totalMoney.toLocaleString()}</Text>
                </View>
              </View>

              <View className="bg-amber-50 rounded-xl p-4 flex items-center gap-3">
                <View className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center">
                  <TrendingUp size={20} color="#fff" />
                </View>
                <View className="flex-1">
                  <Text className="block text-sm text-stone-500">平均财富</Text>
                  <Text className="block text-xl font-bold text-amber-600">¥{summaryData.avgBalance.toLocaleString()}</Text>
                </View>
              </View>

              {summaryData.richestUser && (
                <View className="bg-yellow-50 rounded-xl p-4 flex items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
                    <Crown size={20} color="#fff" />
                  </View>
                  <View className="flex-1">
                    <Text className="block text-sm text-stone-500">首富</Text>
                    <Text className="block text-lg font-bold text-yellow-600 truncate">{summaryData.richestUser.nickname}</Text>
                    <Text className="block text-sm text-yellow-600">¥{summaryData.richestUser.balance.toLocaleString()}</Text>
                  </View>
                </View>
              )}

              <View className="flex gap-2">
                <View className="flex-1 bg-stone-50 rounded-xl p-3 text-center">
                  <Text className="block text-2xl font-bold text-stone-700">{summaryData.cityCount}</Text>
                  <Text className="block text-xs text-stone-500">覆盖城市</Text>
                </View>
                <View className="flex-1 bg-stone-50 rounded-xl p-3 text-center">
                  <Text className="block text-2xl font-bold text-stone-700">{summaryData.provinceCount}</Text>
                  <Text className="block text-xs text-stone-500">覆盖省份</Text>
                </View>
              </View>
            </View>
          )}

          <View className="mt-4">
            <Button className="w-full bg-orange-500" onClick={() => setShowSummary(false)}>
              <Text className="text-white font-medium">关闭</Text>
            </Button>
          </View>
        </DialogContent>
      </Dialog>
    </View>
  );
}
