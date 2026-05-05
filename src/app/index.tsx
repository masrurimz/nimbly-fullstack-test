import { View, Text, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';

// ─── Types ───────────────────────────────────────────────
interface Task {
  id: string;
  title: string;
  status: 'pending' | 'completed';
  createdAt: string;
}

// ─── Mock API ────────────────────────────────────────────
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
let tasksStore: Task[] = [
  { id: '1', title: 'Review PR', status: 'pending', createdAt: new Date().toISOString() },
  { id: '2', title: 'Write tests', status: 'completed', createdAt: new Date().toISOString() },
  { id: '3', title: 'Build offline queue', status: 'pending', createdAt: new Date().toISOString() },
  { id: '4', title: 'Fix navigation bug', status: 'pending', createdAt: new Date().toISOString() },
];

const api = {
  getTasks: async (): Promise<Task[]> => {
    await delay(600);
    return [...tasksStore];
  },
  toggleTask: async (id: string): Promise<Task> => {
    await delay(400);
    const task = tasksStore.find((t) => t.id === id);
    if (!task) throw new Error('Task not found');
    tasksStore = tasksStore.map((t) =>
      t.id === id ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' } : t,
    );
    return tasksStore.find((t) => t.id === id)!;
  },
  addTask: async (title: string): Promise<Task> => {
    await delay(500);
    const task: Task = { id: Date.now().toString(), title, status: 'pending', createdAt: new Date().toISOString() };
    tasksStore.push(task);
    return task;
  },
};

// ─── Main Screen ─────────────────────────────────────────
export default function TasksScreen() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [showForm, setShowForm] = useState(false);

  const queryClient = useQueryClient();

  // BUG #1: Inconsistent query key (notice: 'task-list' vs 'tasks' below)
  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['task-list'],
    queryFn: api.getTasks,
  });

  // BUG #2: No error handling in mutation
  const toggleMutation = useMutation({
    mutationFn: api.toggleTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const addMutation = useMutation({
    mutationFn: api.addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task-list'] });
      setShowForm(false);
    },
    onError: (err: Error) => Alert.alert('Error', err.message),
  });

  const form = useForm({
    defaultValues: { title: '' },
    onSubmit: ({ value }) => addMutation.mutate(value.title),
  });

  const handleToggle = (id: string) => {
    toggleMutation.mutate(id);
  };

  const filtered = (tasks ?? [])
    .filter((t) => {
      if (filter === 'pending') return t.status === 'pending';
      if (filter === 'completed') return t.status === 'completed';
      return true;
    })
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

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

      {/* Filter chips */}
      <View className="flex-row gap-2 mb-4">
        {(['all', 'pending', 'completed'] as const).map((f) => (
          <TouchableOpacity
            key={f}
            className={`px-3 py-1 rounded-full ${filter === f ? 'bg-blue-500' : 'bg-gray-100'}`}
            onPress={() => setFilter(f)}
          >
            <Text className={filter === f ? 'text-white' : 'text-gray-700'}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* BUG #3: FlatList is missing keyExtractor */}
      <FlatList
        data={filtered}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-row items-center p-3 border-b border-gray-200"
            onPress={() => handleToggle(item.id)}
          >
            <View
              className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${
                item.status === 'completed' ? 'bg-green-500 border-green-500' : 'border-gray-400'
              }`}
            />
            <Text
              className={`flex-1 text-base ${
                item.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'
              }`}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text className="text-gray-400 text-center mt-8">No tasks found</Text>
        }
      />

      {/* Add Task Modal */}
      {showForm && (
        <View className="absolute inset-0 bg-black/50 justify-center px-8">
          <View className="bg-white rounded-xl p-6">
            <Text className="text-lg font-bold mb-4">Add Task</Text>
            <form.Field name="title">
              {(field) => (
                <TextInput
                  className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
                  placeholder="Task title"
                  value={field.state.value}
                  onChangeText={field.handleChange}
                />
              )}
            </form.Field>
            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1 bg-blue-500 py-2 rounded-lg items-center"
                onPress={form.handleSubmit}
              >
                <Text className="text-white font-medium">Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-gray-100 py-2 rounded-lg items-center"
                onPress={() => setShowForm(false)}
              >
                <Text className="text-gray-700 font-medium">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
