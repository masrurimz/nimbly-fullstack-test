import { View, Text, TouchableOpacity } from 'react-native';
import type { TaskFilter } from '../api/types';

interface FilterBarProps {
  value: TaskFilter;
  onChange: (filter: TaskFilter) => void;
}

const filters: TaskFilter[] = ['all', 'pending', 'completed'];

export function FilterBar({ value, onChange }: FilterBarProps) {
  return (
    <View className="flex-row gap-2 mb-4">
      {filters.map((f) => (
        <TouchableOpacity
          key={f}
          className={`px-3 py-1 rounded-full ${value === f ? 'bg-blue-500' : 'bg-gray-100'}`}
          onPress={() => onChange(f)}
        >
          <Text className={value === f ? 'text-white' : 'text-gray-700'}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
