import { View, Text } from '@tarojs/components';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skull, RotateCcw, TrendingDown } from 'lucide-react-taro';

interface GameOverViewProps {
  daysSurvived: number;
  totalIncome: number;
  totalExpense: number;
  onRestart: () => void;
}

export const GameOverView = ({ daysSurvived, totalIncome, totalExpense, onRestart }: GameOverViewProps) => {
  return (
    <View className="flex flex-col items-center justify-center min-h-screen px-4 bg-red-50">
      <Skull size={80} color="#ef4444" />
      <Text className="text-3xl font-bold text-red-600 mt-4">身无分文！</Text>
      <Text className="text-base text-gray-500 mt-2">你已经破产了...</Text>

      <Card className="w-full mt-8">
        <CardHeader>
          <CardTitle className="text-center">游戏结算</CardTitle>
        </CardHeader>
        <CardContent>
          <View className="space-y-3">
            <View className="flex justify-between items-center">
              <Text className="text-gray-500">存活天数</Text>
              <Text className="text-lg font-bold">{daysSurvived} 天</Text>
            </View>
            <View className="flex justify-between items-center">
              <Text className="text-gray-500">总收入</Text>
              <Text className="text-lg font-bold text-green-500">+¥{totalIncome}</Text>
            </View>
            <View className="flex justify-between items-center">
              <View className="flex items-center gap-1">
                <TrendingDown size={14} color="#ef4444" />
                <Text className="text-gray-500">总支出</Text>
              </View>
              <Text className="text-lg font-bold text-red-500">-¥{totalExpense}</Text>
            </View>
          </View>
        </CardContent>
      </Card>

      <Button
        className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white"
        size="lg"
        onClick={onRestart}
      >
        <RotateCcw size={18} color="#fff" />
        <Text className="ml-2 text-white">重新开始</Text>
      </Button>
    </View>
  );
};

export default GameOverView;
