import { View, Text, ScrollView } from '@tarojs/components';
import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { MapPin, Building, Store, Map, Navigation } from 'lucide-react-taro';
import { pickRandomDistricts } from '@/lib/random';
import { type District } from '@/data/china-cities';

const iconMap: Record<string, any> = {
  district: Building,
  business: Store,
  scenic: Map,
  street: Navigation,
};

const typeLabelMap: Record<string, string> = {
  district: '区县',
  business: '商圈',
  scenic: '景点',
  street: '街区',
};

const colorMap: Record<string, { color: string; bg: string }> = {
  district: { color: '#6b7280', bg: 'bg-gray-100' },
  business: { color: '#f97316', bg: 'bg-orange-100' },
  scenic: { color: '#10b981', bg: 'bg-green-100' },
  street: { color: '#8b5cf6', bg: 'bg-purple-100' },
};

interface LocationPickerProps {
  open: boolean;
  districts: District[];
  onSelect: (district: District) => void;
  onClose: () => void;
}

export const LocationPicker = ({ open, districts, onSelect, onClose }: LocationPickerProps) => {
  const picked = useMemo(() => pickRandomDistricts(districts, 10), [districts, open]);

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-md">
        <View className="p-2">
          <Text className="text-lg font-bold text-center block mb-1">出门逛逛</Text>
          <Text className="text-sm text-gray-500 text-center block mb-4">选择一个地点，触发随机事件</Text>

          <ScrollView scrollY style={{ maxHeight: '420px' }}>
            <View className="grid grid-cols-2 gap-3">
              {picked.map((d) => {
                const style = colorMap[d.type] || colorMap.district;
                const IconComp = iconMap[d.type] || MapPin;
                return (
                  <Card
                    key={d.name}
                    className="active:scale-95 cursor-pointer border-2 border-orange-100 hover:border-orange-300"
                    onClick={() => onSelect(d)}
                  >
                    <CardContent className="p-3">
                      <View className="flex items-center gap-2 mb-2">
                        <IconComp size={18} color={style.color} />
                        <Badge variant="outline" className={style.bg}>
                          <Text style={{ color: style.color, fontSize: '10px' }}>
                            {typeLabelMap[d.type] || d.type}
                          </Text>
                        </Badge>
                      </View>
                      <Text className="text-sm font-semibold">{d.name}</Text>
                    </CardContent>
                  </Card>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </DialogContent>
    </Dialog>
  );
};

export default LocationPicker;
