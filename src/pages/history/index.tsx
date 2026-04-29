import { View, Text, ScrollView } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, TrendingUp, TrendingDown, MapPin, Clock, RefreshCw } from 'lucide-react-taro';
import { useGameStore } from '@/store/game-store';
import './index.css';

interface HistoryRecord {
  id: string;
  day: number;
  eventTitle: string;
  eventResult: string;
  moneyChange: number;
  balance: number;
  locationName: string;
  createdAt: string;
}

export default function History() {
  const [records, setRecords] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useGameStore((state) => state.user);

  // 监听store变化，实时同步数据
  useEffect(() => {
    loadRecords();
  }, [user?.dailyRecords, user?.balance, user?.day]);

  const loadRecords = () => {
    if (!user) {
      setRecords([]);
      setLoading(false);
      return;
    }
    
    // 从本地store获取所有历史记录
    const localRecords = user.dailyRecords || [];
    
    // 转换为HistoryRecord格式并按时间倒序排列
    const formattedRecords: HistoryRecord[] = localRecords
      .map((r, i) => ({
        id: `record_${i}_${r.date || Date.now()}`,
        day: r.day || user.day - localRecords.length + i + 1,
        eventTitle: r.eventTitle || '未知事件',
        eventResult: r.eventResult || '无描述',
        moneyChange: r.moneyChange || 0,
        balance: r.balance || user.balance,
        locationName: r.locationName || user.location?.city || '未知地点',
        createdAt: r.date || new Date(Date.now() - i * 1000).toISOString(),
      }))
      .sort((a, b) => {
        // 按时间倒序排列（最新的在前）
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
    
    setRecords(formattedRecords);
    setLoading(false);
  };

  // 手动刷新历史记录
  const handleRefresh = () => {
    loadRecords();
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

  // 按天分组
  const groupedRecords = records.reduce((acc, record) => {
    const day = record.day;
    if (!acc[day]) acc[day] = [];
    acc[day].push(record);
    return acc;
  }, {} as Record<number, HistoryRecord[]>);

  return (
    <View className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* 头部 */}
      <View className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-6">
        <View className="flex items-center justify-between">
          <View className="flex items-center gap-2">
            <Clock size={24} color="#fff" />
            <Text className="text-xl font-bold text-white">游戏历史</Text>
          </View>
          <View 
            className="p-2 bg-white bg-opacity-20 rounded-full"
            onClick={handleRefresh}
          >
            <RefreshCw size={18} color="#fff" />
          </View>
        </View>
        <Text className="text-amber-100 text-sm mt-1">记录你的每一次选择</Text>
      </View>

      {/* 统计卡片 */}
      {user && (
        <View className="px-4 -mt-4">
          <Card className="bg-white shadow-lg border-amber-200">
            <CardContent className="p-4">
              <View className="flex justify-between text-center">
                <View className="flex-1">
                  <Text className="block text-2xl font-bold text-green-600">
                    +{summary.income}
                  </Text>
                  <Text className="block text-xs text-gray-400">总收入</Text>
                </View>
                <View className="flex-1 border-x border-gray-100">
                  <Text className="block text-2xl font-bold text-red-500">
                    -{summary.expense}
                  </Text>
                  <Text className="block text-xs text-gray-400">总支出</Text>
                </View>
                <View className="flex-1">
                  <Text className={`block text-2xl font-bold ${
                    summary.total >= 0 ? 'text-amber-600' : 'text-red-500'
                  }`}
                  >
                    {summary.total >= 0 ? '+' : ''}{summary.total}
                  </Text>
                  <Text className="block text-xs text-gray-400">净收益</Text>
                </View>
              </View>
              <View className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-sm text-gray-500">
                <Text>游戏天数：{user.day}天</Text>
                <Text>当前财富：¥{user.balance.toLocaleString()}</Text>
              </View>
            </CardContent>
          </Card>
        </View>
      )}

      {/* 历史记录列表 */}
      <ScrollView scrollY className="px-4 py-4 pb-24" style={{ height: 'calc(100vh - 320px)' }}>
        {loading ? (
          <View className="flex items-center justify-center py-12">
            <Text className="text-gray-400">加载中...</Text>
          </View>
        ) : records.length === 0 ? (
          <View className="flex flex-col items-center justify-center py-12">
            <Text className="text-gray-400 mb-2">暂无历史记录</Text>
            <Text className="text-sm text-gray-400">开始你的首富之旅吧！</Text>
          </View>
        ) : (
          Object.entries(groupedRecords)
            .sort((a, b) => Number(b[0]) - Number(a[0]))
            .map(([day, dayRecords]) => (
              <View key={day} className="mb-4">
                {/* 天数标签 */}
                <View className="flex items-center gap-2 mb-2">
                  <Calendar size={14} color="#f59e0b" />
                  <Text className="text-sm font-medium text-amber-700">第{day}天</Text>
                  <View className="flex-1 h-px bg-amber-200"></View>
                </View>

                {/* 当天记录 */}
                {dayRecords.map((record) => (
                  <Card 
                    key={record.id} 
                    className={`mb-2 border-l-4 ${
                      record.moneyChange >= 0 
                        ? 'border-l-green-500 bg-green-50' 
                        : 'border-l-red-500 bg-red-50'
                    }`}
                  >
                    <CardContent className="p-3">
                      <View className="flex items-start gap-3">
                        {/* 图标 */}
                        <View className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          record.moneyChange >= 0 
                            ? 'bg-green-100' 
                            : 'bg-red-100'
                        }`}
                        >
                          {record.moneyChange >= 0 ? (
                            <TrendingUp size={16} color="#22c55e" />
                          ) : (
                            <TrendingDown size={16} color="#ef4444" />
                          )}
                        </View>

                        {/* 内容 */}
                        <View className="flex-1">
                          <View className="flex items-start justify-between">
                            <View className="flex-1">
                              <Text className="block text-sm font-medium text-gray-800">
                                {record.eventTitle}
                              </Text>
                              <Text className="block text-xs text-gray-500 mt-1">
                                {record.eventResult}
                              </Text>
                              <View className="flex items-center gap-2 mt-2">
                                <MapPin size={10} color="#9ca3af" />
                                <Text className="text-xs text-gray-400">{record.locationName}</Text>
                                <Clock size={10} color="#9ca3af" className="ml-2" />
                                <Text className="text-xs text-gray-400">{formatDate(record.createdAt)}</Text>
                              </View>
                            </View>
                            <Text className={`text-lg font-bold ${
                              record.moneyChange >= 0 
                                ? 'text-green-600' 
                                : 'text-red-500'
                            }`}
                            >
                              {record.moneyChange >= 0 ? '+' : ''}{record.moneyChange}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* 当天余额 */}
                      <View className="mt-2 pt-2 border-t border-gray-200 flex justify-between text-xs text-gray-400">
                        <Text>发生地点: {record.locationName}</Text>
                        <Text>余额: ¥{record.balance.toLocaleString()}</Text>
                      </View>
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
