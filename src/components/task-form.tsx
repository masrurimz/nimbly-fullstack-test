import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm } from '@tanstack/react-form';
import { useCreateTask } from '../hooks/use-tasks';

interface TaskFormProps {
  onClose: () => void;
}

export function TaskForm({ onClose }: TaskFormProps) {
  const createTask = useCreateTask(onClose);

  const form = useForm({
    defaultValues: { title: '' },
    onSubmit: ({ value }) => createTask.mutate(value.title),
  });

  return (
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
          <form.Subscribe
            selector={(state) => ({
              canSubmit: state.canSubmit,
              isSubmitting: state.isSubmitting,
            })}
          >
            {({ canSubmit, isSubmitting }) => (
              <TouchableOpacity
                className={`flex-1 py-2 rounded-lg items-center ${canSubmit ? 'bg-blue-500' : 'bg-blue-300'}`}
                onPress={form.handleSubmit}
                disabled={!canSubmit || isSubmitting}
              >
                <Text className="text-white font-medium">
                  {isSubmitting ? 'Saving...' : 'Save'}
                </Text>
              </TouchableOpacity>
            )}
          </form.Subscribe>
          <TouchableOpacity
            className="flex-1 bg-gray-100 py-2 rounded-lg items-center"
            onPress={onClose}
            disabled={createTask.isPending}
          >
            <Text className="text-gray-700 font-medium">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
