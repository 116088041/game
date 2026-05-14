import { View, Text } from '@tarojs/components';
import { Coins } from 'lucide-react-taro';

interface MoneyDisplayProps {
  balance: number;
  change?: number;
}

export const MoneyDisplay = ({ balance, change }: MoneyDisplayProps) => {
  const showChange = change !== undefined && change !== 0;
  const isPositive = change !== undefined && change > 0;

  return (
    <View className="flex items-center gap-2">
      <Coins size={20} color="#f59e0b" />
      <Text className="text-lg font-bold text-gray-800">
        ¥{Math.round(balance)}
      </Text>
      {showChange && (
        <Text className={`text-sm font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '+' : ''}{Math.round(change)}
        </Text>
      )}
    </View>
  );
};

export default MoneyDisplay;
