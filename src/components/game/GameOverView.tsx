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
    <View className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-b from-orange-50 to-amber-50">
      <Skull size={72} color="#e11d48" />
      <Text className="text-3xl font-bold text-stone-800 mt-4">身无分文！</Text>
      <Text className="text-base text-stone-400 mt-2">你已经破产了...</Text>

      <Card className="w-full mt-8 shadow-sm border border-orange-100">
        <CardHeader>
          <CardTitle className="text-center text-stone-800">游戏结算</CardTitle>
        </CardHeader>
        <CardContent>
          <View className="space-y-3">
            <View className="flex justify-between items-center">
              <Text className="text-stone-400">存活天数</Text>
              <Text className="text-lg font-bold text-stone-800">{daysSurvived} 天</Text>
            </View>
            <View className="flex justify-between items-center">
              <Text className="text-stone-400">总收入</Text>
              <Text className="text-lg font-bold text-emerald-500">+¥{totalIncome}</Text>
            </View>
            <View className="flex justify-between items-center">
              <View className="flex items-center gap-1">
                <TrendingDown size={14} color="#e11d48" />
                <Text className="text-stone-400">总支出</Text>
              </View>
              <Text className="text-lg font-bold text-rose-500">-¥{totalExpense}</Text>
            </View>
          </View>
        </CardContent>
      </Card>

      <Button
        className="w-full mt-6 bg-orange-500 text-white shadow-lg shadow-orange-200"
        size="lg"
        onClick={onRestart}
      >
        <RotateCcw size={18} color="#fff" />
        <Text className="ml-2 text-white font-medium">重新开始</Text>
      </Button>
    </View>
  );
};

export default GameOverView;
