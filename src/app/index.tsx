import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from 'react';

import { useTasksQuery, useToggleTask, useFilteredTasks } from '../hooks/use-tasks';
import { TaskItem } from '../components/task-item';
import { TaskForm } from '../components/task-form';
import { FilterBar } from '../components/filter-bar';
import type { TaskFilter } from '../api/types';

export default function TasksScreen() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [showForm, setShowForm] = useState(false);

  const { data: tasks, isLoading, error } = useTasksQuery();
  const toggleTask = useToggleTask();
  const filtered = useFilteredTasks(tasks, filter, search);

  if (isLoading) return <ActivityIndicator size="large" className="flex-1 justify-center" />;
  if (error) return <Text className="p-4 text-red-500">Error: {error.message}</Text>;

  return (
    <View className="flex-1 bg-white pt-12 px-4">
      <Text className="text-2xl font-bold mb-4">Tasks</Text>

      {/* Search + Add */}
      <View className="flex-row gap-2 mb-4">
        <TextInput
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
          placeholder="Search tasks..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-lg"
          onPress={() => setShowForm(true)}
        >
          <Text className="text-white font-medium">+ Add</Text>
        </TouchableOpacity>
      </View>

      {/* BUG #3: FlatList has no keyExtractor — uses index as default key */}
      <FlatList
        data={filtered}
        renderItem={({ item }) => <TaskItem task={item} onToggle={(id) => toggleTask.mutate(id)} />}
        ListHeaderComponent={<FilterBar value={filter} onChange={setFilter} />}
        ListEmptyComponent={<Text className="text-gray-400 text-center mt-8">No tasks found</Text>}
      />

      {showForm && <TaskForm onClose={() => setShowForm(false)} />}
    </View>
  );
}
