import { View, Text } from '@tarojs/components';
import { Clock } from 'lucide-react-taro';
import { isSettlementDue } from '@/lib/settlement';

interface SettlementBannerProps {
  lastSettlementDate?: string;
}

export const SettlementBanner = ({ lastSettlementDate }: SettlementBannerProps) => {
  const due = isSettlementDue(lastSettlementDate);

  if (!due) {
    return (
      <View className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 rounded-full">
        <Clock size={14} color="#f97316" />
        <Text className="text-xs text-orange-600">每日 18:00 结算</Text>
      </View>
    );
  }

  return (
    <View className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 rounded-full animate-pulse">
      <Clock size={14} color="#d97706" />
      <Text className="text-xs text-amber-700 font-semibold">结算中...</Text>
    </View>
  );
};

export default SettlementBanner;
