import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksApi } from '../api/tasks';
import type { Task } from '../api/types';

// ─── Query key factory ───────────────────────────────────
export const taskKeys = {
  all: ['tasks'] as const,
};

export function useTasksQuery() {
  return useQuery({
    queryKey: ['task-list'],
    queryFn: tasksApi.getAll,
  });
}

export function useToggleTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tasksApi.toggle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

// ─── Create task mutation ────────────────────────────────
export function useCreateTask(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tasksApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task-list'] });
      onSuccess?.();
    },
  });
}

// ─── Derived data ────────────────────────────────────────
export function useFilteredTasks(
  tasks: Task[] | undefined,
  filter: string,
  search: string
): Task[] {
  if (!tasks) return [];

  return tasks
    .filter((t) => {
      if (filter === 'pending') return t.status === 'pending';
      if (filter === 'completed') return t.status === 'completed';
      return true;
    })
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));
}
