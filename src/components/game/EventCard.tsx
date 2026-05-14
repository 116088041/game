import { View, Text } from '@tarojs/components';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Heart, MapPin, Briefcase, PiggyBank, ShoppingBag, Star, CircleAlert } from 'lucide-react-taro';
import type { GameEvent, GameEventOption } from '@/data/game-events';

const eventTypeConfig: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  work: { label: '工作', color: '#3b82f6', bg: 'bg-blue-100', icon: Briefcase },
  investment: { label: '投资', color: '#8b5cf6', bg: 'bg-purple-100', icon: PiggyBank },
  consumption: { label: '消费', color: '#f97316', bg: 'bg-orange-100', icon: ShoppingBag },
  opportunity: { label: '机遇', color: '#10b981', bg: 'bg-green-100', icon: Star },
  risk: { label: '风险', color: '#ef4444', bg: 'bg-red-100', icon: CircleAlert },
};

interface EventCardProps {
  event: GameEvent;
  locationName?: string;
  onOptionSelect: (option: GameEventOption, moneyChange: number) => void;
  onClose: () => void;
}

export const EventCard = ({ event, locationName, onOptionSelect, onClose }: EventCardProps) => {
  const [selectedOption, setSelectedOption] = useState<GameEventOption | null>(null);
  const [moneyResult, setMoneyResult] = useState(0);
  const config = eventTypeConfig[event.type] || eventTypeConfig.risk;
  const IconComp = config.icon;

  const handleSelect = (option: GameEventOption) => {
    const percent = option.percentMin + Math.random() * (option.percentMax - option.percentMin);
    const moneyChange = Math.round(100 * (percent / 100));
    setSelectedOption(option);
    setMoneyResult(moneyChange);
    onOptionSelect(option, moneyChange);
  };

  return (
    <Dialog open={!!event} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-md">
        <View className="p-2">
          <View className="flex items-center gap-2 mb-3">
            <Text className="text-3xl">{event.icon}</Text>
            <View className="flex-1">
              <Text className="text-lg font-bold">{event.title}</Text>
              {locationName && (
                <View className="flex items-center gap-1 mt-0.5">
                  <MapPin size={12} color="#9ca3af" />
                  <Text className="text-xs text-gray-400">{locationName}</Text>
                </View>
              )}
            </View>
            <Badge variant="outline" className={config.bg}>
              <View className="flex items-center gap-1">
                <IconComp size={12} color={config.color} />
                <Text style={{ color: config.color, fontSize: '11px' }}>{config.label}</Text>
              </View>
            </Badge>
          </View>

          <Card className="mb-4 bg-gray-50">
            <CardContent className="p-3">
              <Text className="text-sm text-gray-700 leading-relaxed">
                {event.description.replace(/-\d+元/g, '').replace(/\+\d+元/g, '')}
              </Text>
            </CardContent>
          </Card>

          <View className="space-y-2">
            {event.options.map((opt, idx) => {
              const isSelected = selectedOption?.text === opt.text;
              return (
                <Button
                  key={idx}
                  variant={isSelected ? 'default' : 'outline'}
                  className={`w-full justify-start p-3 h-auto ${isSelected ? 'bg-amber-500 border-amber-500' : 'border-gray-200'}`}
                  onClick={() => handleSelect(opt)}
                  disabled={!!selectedOption}
                >
                  <View className="flex-1">
                    <Text className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                      {opt.text}
                    </Text>
                  </View>
                </Button>
              );
            })}
          </View>

          {selectedOption && (
            <Card className="mt-4 border-green-200 bg-green-50">
              <CardContent className="p-4">
                <Text className="text-sm text-gray-700 mb-3">{selectedOption.description}</Text>
                <View className="flex items-center gap-4">
                  <View className="flex items-center gap-1">
                    {moneyResult >= 0 ? (
                      <TrendingUp size={16} color="#10b981" />
                    ) : (
                      <TrendingDown size={16} color="#ef4444" />
                    )}
                    <Text className={`text-base font-bold ${moneyResult >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {moneyResult >= 0 ? '+' : ''}{moneyResult} 元
                    </Text>
                  </View>
                  <View className="flex items-center gap-1">
                    <Heart
                      size={16}
                      color={selectedOption.moralValue >= 0 ? '#10b981' : '#ef4444'}
                      filled={selectedOption.moralValue >= 0}
                    />
                    <Text className={`text-base font-bold ${selectedOption.moralValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      功德 {selectedOption.moralValue >= 0 ? '+' : ''}{selectedOption.moralValue}
                    </Text>
                  </View>
                </View>
                <Button
                  className="w-full mt-3 bg-gray-800 hover:bg-gray-900 text-white"
                  size="sm"
                  onClick={onClose}
                >
                  <Text className="text-white">继续</Text>
                </Button>
              </CardContent>
            </Card>
          )}
        </View>
      </DialogContent>
    </Dialog>
  );
};

export default EventCard;
