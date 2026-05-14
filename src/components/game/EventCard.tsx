import { View, Text } from '@tarojs/components';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { TrendingUp, TrendingDown, Heart, MapPin } from 'lucide-react-taro';
import type { GameEvent, GameEventOption } from '@/data/game-events';

// 事件类型对应的配图风格
const eventTypeStyle: Record<string, {
  label: string; color: string; bg: string; border: string;
  gradient: string; dotColor: string;
}> = {
  work:       { label: '工作', color: '#3b82f6', bg: 'bg-blue-100',    border: 'border-blue-300',   gradient: 'from-blue-400 via-cyan-400 to-blue-300',    dotColor: '#93c5fd' },
  investment: { label: '投资', color: '#8b5cf6', bg: 'bg-purple-100',  border: 'border-purple-300', gradient: 'from-purple-400 via-violet-400 to-fuchsia-400', dotColor: '#c4b5fd' },
  consumption:{ label: '消费', color: '#f97316', bg: 'bg-orange-100',  border: 'border-orange-300', gradient: 'from-orange-400 via-amber-400 to-yellow-400',   dotColor: '#fdba74' },
  opportunity:{ label: '机遇', color: '#10b981', bg: 'bg-green-100',   border: 'border-green-300',  gradient: 'from-emerald-400 via-green-400 to-teal-400',  dotColor: '#6ee7b7' },
  risk:       { label: '风险', color: '#ef4444', bg: 'bg-red-100',     border: 'border-red-300',    gradient: 'from-red-400 via-rose-400 to-pink-400',       dotColor: '#fca5a5' },
};

// 装饰性SVG形状
const DecorationDots = ({ color }: { color: string }) => (
  <View className="absolute inset-0 overflow-hidden" style={{ borderRadius: '12px' }}>
    <View className="absolute top-2 right-3 w-10 h-10 rounded-full opacity-30" style={{ backgroundColor: color }} />
    <View className="absolute bottom-1 left-4 w-6 h-6 rounded-full opacity-20" style={{ backgroundColor: color }} />
    <View className="absolute top-6 left-2 w-4 h-4 rounded-full opacity-25" style={{ backgroundColor: color }} />
  </View>
);

interface EventCardProps {
  event: GameEvent;
  locationName?: string;
  onOptionSelect: (option: GameEventOption, moneyChange: number) => void;
  onClose: () => void;
}

export const EventCard = ({ event, locationName, onOptionSelect, onClose }: EventCardProps) => {
  const [selectedOption, setSelectedOption] = useState<GameEventOption | null>(null);
  const [moneyResult, setMoneyResult] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const style = eventTypeStyle[event.type] || eventTypeStyle.risk;

  const handleSelect = (option: GameEventOption) => {
    const percent = option.percentMin + Math.random() * (option.percentMax - option.percentMin);
    const moneyChange = Math.round(100 * (percent / 100));
    setSelectedOption(option);
    setMoneyResult(moneyChange);
    setShowResult(true);
    onOptionSelect(option, moneyChange);
  };

  const isGoodNews = moneyResult >= 0;

  return (
    <Dialog open={!!event} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-md overflow-hidden">
        {/* 配图区域 */}
        <View className={`relative h-36 bg-gradient-to-br ${style.gradient} flex items-center justify-center`}>
          <DecorationDots color={style.dotColor} />

          {/* 大号事件图标 */}
          <View className="relative z-10 flex flex-col items-center">
            <View className="w-20 h-20 bg-white bg-opacity-30 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg">
              <Text className="text-5xl">{event.icon}</Text>
            </View>
          </View>

          {/* 类型标签 */}
          <View className="absolute top-3 right-3 z-10">
            <Badge variant="outline" className={`${style.bg} ${style.border} border`}>
              <Text style={{ color: style.color, fontSize: '11px', fontWeight: 'bold' }}>{style.label}</Text>
            </Badge>
          </View>
        </View>

        <View className="p-4">
          {/* 标题和地点 */}
          <View className="mb-3">
            <Text className="text-lg font-bold text-gray-800">{event.title}</Text>
            {locationName && (
              <View className="flex items-center gap-1 mt-1">
                <MapPin size={12} color="#9ca3af" />
                <Text className="text-xs text-gray-400">{locationName}</Text>
              </View>
            )}
          </View>

          {/* 事件描述 */}
          <View className="bg-gray-50 rounded-xl p-3 mb-4">
            <Text className="text-sm text-gray-700 leading-relaxed">
              {event.description}
            </Text>
          </View>

          {/* 选项列表 */}
          {!showResult && (
            <View className="space-y-2">
              <Text className="text-xs text-gray-400 mb-1">你选择：</Text>
              {event.options.map((opt, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="w-full justify-start p-3 h-auto border-gray-200 hover:border-amber-300 hover:bg-amber-50"
                  onClick={() => handleSelect(opt)}
                >
                  <Text className="text-sm font-semibold text-gray-800">{opt.text}</Text>
                </Button>
              ))}
            </View>
          )}

          {/* 结果展示 */}
          {showResult && selectedOption && (
            <View>
              {/* 分隔线 */}
              <View className="flex items-center gap-2 mb-4">
                <View className="flex-1 h-px bg-gray-200" />
                <Text className="text-xs text-gray-400">结果</Text>
                <View className="flex-1 h-px bg-gray-200" />
              </View>

              {/* 大字金额变化 */}
              <View className={`rounded-2xl p-5 mb-4 ${isGoodNews ? 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200' : 'bg-gradient-to-br from-red-50 to-rose-50 border border-red-200'}`}>
                <View className="flex items-center justify-center gap-2 mb-3">
                  {isGoodNews ? (
                    <TrendingUp size={28} color="#10b981" />
                  ) : (
                    <TrendingDown size={28} color="#ef4444" />
                  )}
                  <Text className={`text-3xl font-black ${isGoodNews ? 'text-green-600' : 'text-red-600'}`}>
                    {isGoodNews ? '+' : ''}{moneyResult}
                  </Text>
                </View>

                {/* 功德值变化 */}
                {selectedOption.moralValue !== 0 && (
                  <View className="flex items-center justify-center gap-1.5">
                    <Heart
                      size={16}
                      color={selectedOption.moralValue >= 0 ? '#10b981' : '#ef4444'}
                      filled={selectedOption.moralValue >= 0}
                    />
                    <Text className={`text-sm font-bold ${selectedOption.moralValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      功德 {selectedOption.moralValue >= 0 ? '+' : ''}{selectedOption.moralValue}
                    </Text>
                  </View>
                )}
              </View>

              {/* 结果文案 */}
              <View className="bg-white rounded-xl p-4 border border-gray-100 mb-4">
                <Text className="text-sm text-gray-700 leading-relaxed">{selectedOption.description}</Text>
              </View>

              {/* 关闭按钮 */}
              <Button
                className={`w-full h-11 text-white font-bold ${isGoodNews ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-700 hover:bg-gray-800'}`}
                size="lg"
                onClick={onClose}
              >
                知道了
              </Button>
            </View>
          )}
        </View>
      </DialogContent>
    </Dialog>
  );
};

export default EventCard;
