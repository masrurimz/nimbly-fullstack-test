import { View, Text, TouchableOpacity } from 'react-native';
import type { Task } from '../api/types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

export function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <TouchableOpacity
      className="flex-row items-center p-3 border-b border-gray-200"
      onPress={() => onToggle(task.id)}
    >
      <View
        className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${
          task.status === 'completed' ? 'bg-green-500 border-green-500' : 'border-gray-400'
        }`}
      />
      <Text
        className={`flex-1 text-base ${
          task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'
        }`}
      >
        {task.title}
      </Text>
    </TouchableOpacity>
  );
}
