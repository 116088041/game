import { View, Text, ScrollView } from '@tarojs/components';
import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, TrendingUp, TrendingDown, MapPin, Clock, RefreshCw, Heart } from 'lucide-react-taro';
import { Network } from '@/network';
import { useGameStore } from '@/store/game-store';
import './index.css';

interface HistoryRecord {
  id: string;
  eventTitle: string;
  eventResult: string;
  moneyChange: number;
  karmaChange: number;
  karmaValue: number;
  balance: number;
  locationName: string;
  createdAt: string;
}

export default function History() {
  const [records, setRecords] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const user = useGameStore((state) => state.user);
  const gameStatus = useGameStore((state) => state.gameStatus);

  const loadRecords = useCallback(() => {
    const currentUser = useGameStore.getState().user;
    if (!currentUser) {
      setRecords([]);
      setLoading(false);
      return;
    }

    const localRecords = currentUser.dailyRecords || [];
    if (localRecords.length > 0) {
      const mappedRecords = localRecords.map((r, i) => ({
        ...r,
        id: r.eventTitle + i,
        eventTitle: r.eventTitle || '未知事件',
        eventResult: r.eventResult || '无描述',
        locationName: r.locationName || currentUser.location?.city || '未知地点',
        createdAt: r.date || new Date().toISOString(),
      }));
      setRecords(mappedRecords.reverse());
    } else {
      setRecords([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadRecords();
    fetchHistory();
  }, [loadRecords, gameStatus]);

  const fetchHistory = async () => {
    const currentUser = useGameStore.getState().user;
    if (!currentUser) return;

    setLoading(true);
    try {
      const res = await Network.request({
        url: `/api/game/records?userId=${currentUser.id}`,
        method: 'GET',
      });

      if (res.data?.code === 200 && res.data.data?.length > 0) {
        setRecords(res.data.data);
      }
    } catch (error) {
      console.error('获取历史记录失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadRecords();
    fetchHistory();
  };

  const getDaySummary = () => {
    if (records.length === 0) return { total: 0, income: 0, expense: 0 };

    const income = records.filter(r => r.moneyChange > 0).reduce((sum, r) => sum + r.moneyChange, 0);
    const expense = records.filter(r => r.moneyChange < 0).reduce((sum, r) => sum + r.moneyChange, 0);

    return {
      total: income + expense,
      income,
      expense: Math.abs(expense),
    };
  };

  const summary = getDaySummary();

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return dateStr;
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const groupedRecords = records.reduce((acc, record) => {
    const date = record.createdAt?.split('T')[0] || '未知';
    if (!acc[date]) acc[date] = [];
    acc[date].push(record);
    return acc;
  }, {} as Record<string, HistoryRecord[]>);

  return (
    <View className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 flex flex-col">
      {/* 头部 */}
      <View className="bg-gradient-to-r from-orange-500 to-amber-500 px-4 pt-4 pb-6 flex-shrink-0">
        <View className="flex items-center justify-between">
          <View className="flex items-center gap-2">
            <Clock size={24} color="#fff" />
            <Text className="text-xl font-bold text-white">游戏历史</Text>
          </View>
          <View
            className="p-2 bg-white/20 rounded-full"
            onClick={handleRefresh}
          >
            <RefreshCw size={18} color="#fff" />
          </View>
        </View>
        <Text className="text-orange-100 text-sm mt-1">记录你的每一次选择</Text>
      </View>

      {/* 统计卡片 */}
      {user && (
        <View className="px-4 pt-4 flex-shrink-0">
          <Card className="bg-white shadow-sm border border-orange-100">
            <CardContent className="p-4">
              <View className="flex justify-between text-center">
                <View className="flex-1">
                  <Text className="block text-2xl font-bold text-emerald-600">+{summary.income}</Text>
                  <Text className="block text-xs text-stone-400 mt-0.5">总收入</Text>
                </View>
                <View className="flex-1 border-x border-orange-50">
                  <Text className="block text-2xl font-bold text-rose-500">-{summary.expense}</Text>
                  <Text className="block text-xs text-stone-400 mt-0.5">总支出</Text>
                </View>
                <View className="flex-1">
                  <Text className={`block text-2xl font-bold ${summary.total >= 0 ? 'text-orange-600' : 'text-rose-500'}`}>
                    {summary.total >= 0 ? '+' : ''}{summary.total}
                  </Text>
                  <Text className="block text-xs text-stone-400 mt-0.5">净收益</Text>
                </View>
              </View>
              <View className="mt-3 pt-3 border-t border-orange-50 flex justify-between text-sm">
                <View className="flex items-center gap-1">
                  <Heart size={14} color={user.karmaValue >= 0 ? '#10b981' : '#e11d48'} />
                  <Text className={user.karmaValue >= 0 ? 'text-emerald-600' : 'text-rose-500'}>
                    功德 {user.karmaValue >= 0 ? '+' : ''}{user.karmaValue}
                  </Text>
                </View>
                <Text className="text-stone-500">当前 ¥{user.balance.toLocaleString()}</Text>
              </View>
            </CardContent>
          </Card>
        </View>
      )}

      {/* 历史记录列表 */}
      <ScrollView scrollY className="flex-1 px-4 pt-4 pb-16">
        {loading ? (
          <View className="flex items-center justify-center py-12">
            <Text className="text-stone-400">加载中...</Text>
          </View>
        ) : records.length === 0 ? (
          <View className="flex flex-col items-center justify-center py-12">
            <Text className="text-stone-400 mb-2">暂无历史记录</Text>
            <Text className="text-sm text-stone-400">开始你的首富之旅吧！</Text>
          </View>
        ) : (
          Object.entries(groupedRecords)
            .sort((a, b) => b[0].localeCompare(a[0]))
            .map(([date, dayRecords]) => (
              <View key={date} className="mb-4">
                <View className="flex items-center gap-2 mb-2">
                  <Calendar size={14} color="#f97316" />
                  <Text className="text-sm font-medium text-orange-600">{date}</Text>
                  <View className="flex-1 h-px bg-orange-100"></View>
                </View>

                {dayRecords.map((record) => (
                  <Card
                    key={record.id}
                    className={`mb-2 border-l-4 overflow-hidden ${record.moneyChange >= 0 ? 'border-l-emerald-500 bg-emerald-50/50' : 'border-l-rose-500 bg-rose-50/50'} ${expandedId === record.id ? 'shadow-md' : 'shadow-sm'}`}
                    onClick={() => setExpandedId(expandedId === record.id ? null : record.id)}
                  >
                    <CardContent className="p-3">
                      <View className="flex items-start gap-3 min-w-0">
                        <View className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${record.moneyChange >= 0 ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                          {record.moneyChange >= 0 ? (
                            <TrendingUp size={16} color="#10b981" />
                          ) : (
                            <TrendingDown size={16} color="#e11d48" />
                          )}
                        </View>

                        <View className="flex-1 min-w-0">
                          <View className="flex items-start justify-between">
                            <View className="flex-1 min-w-0 mr-2">
                              <Text className="block text-sm font-medium text-stone-800 truncate">{record.eventTitle}</Text>
                              <Text className="block text-xs text-stone-400 mt-1 line-clamp-2">{record.eventResult}</Text>
                              <View className="flex items-center gap-2 mt-2 flex-wrap">
                                <MapPin size={10} color="#a8a29e" />
                                <Text className="text-xs text-stone-400 truncate">{record.locationName}</Text>
                                <Clock size={10} color="#a8a29e" />
                                <Text className="text-xs text-stone-400">{formatDate(record.createdAt)}</Text>
                              </View>

                              {expandedId === record.id && (
                                <View className="mt-3 p-3 bg-white/80 rounded-lg border border-orange-100">
                                  <Text className="block text-xs text-stone-500 mb-2 font-medium">事件详情:</Text>
                                  <Text className="block text-sm text-stone-700 leading-relaxed">{record.eventResult}</Text>
                                  <View className="mt-2 pt-2 border-t border-orange-50">
                                    <Text className="text-xs text-stone-400">发生地点: {record.locationName}</Text>
                                    <Text className="text-xs text-stone-400 mt-1">当时余额: ¥{record.balance.toLocaleString()}</Text>
                                    <Text className={`text-sm font-bold mt-2 ${record.moneyChange >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                                      金额变化: {record.moneyChange >= 0 ? '+' : ''}{record.moneyChange}元
                                    </Text>
                                    {record.karmaChange !== undefined && record.karmaChange !== 0 && (
                                      <View className="flex items-center gap-1 mt-1">
                                        <Heart size={12} color={record.karmaChange >= 0 ? '#10b981' : '#e11d48'} />
                                        <Text className={`text-xs ${record.karmaChange >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                                          功德值: {record.karmaChange >= 0 ? '+' : ''}{record.karmaChange}
                                        </Text>
                                      </View>
                                    )}
                                  </View>
                                </View>
                              )}
                            </View>
                            <Text className={`text-lg font-bold flex-shrink-0 ${record.moneyChange >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                              {record.moneyChange >= 0 ? '+' : ''}{record.moneyChange}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {expandedId !== record.id && (
                        <View className="mt-2 pt-2 border-t border-orange-50 flex justify-between text-xs text-stone-400">
                          <Text>点击查看详情</Text>
                          <Text>余额: ¥{record.balance.toLocaleString()}</Text>
                        </View>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </View>
            ))
        )}
      </ScrollView>
    </View>
  );
}
