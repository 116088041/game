import { View, Text } from '@tarojs/components';
import { Heart } from 'lucide-react-taro';
import { getKarmaColor, getKarmaLabel } from '@/lib/karma';

interface KarmaDisplayProps {
  value: number;
  change?: number;
}

export const KarmaDisplay = ({ value, change }: KarmaDisplayProps) => {
  const color = getKarmaColor(value);
  const label = getKarmaLabel(value);
  const showChange = change !== undefined && change !== 0;
  const isPositive = change !== undefined && change > 0;

  return (
    <View className="flex items-center gap-1.5">
      <View className="flex items-center gap-1">
        <Heart size={16} color={color} filled={value >= 50} />
        <Text className="text-sm font-semibold" style={{ color }}>
          {label}
        </Text>
      </View>
      <Text className="text-xs text-gray-400">
        功德 {value >= 0 ? '+' : ''}{Math.round(value)}
      </Text>
      {showChange && (
        <Text className={`text-xs font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '+' : ''}{Math.round(change)}
        </Text>
      )}
    </View>
  );
};

export default KarmaDisplay;
