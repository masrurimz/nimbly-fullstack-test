import type { Task } from './types';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

let tasksStore: Task[] = [
  { id: '1', title: 'Review PR', status: 'pending', createdAt: new Date().toISOString() },
  { id: '2', title: 'Write tests', status: 'completed', createdAt: new Date().toISOString() },
  { id: '3', title: 'Build offline queue', status: 'pending', createdAt: new Date().toISOString() },
  { id: '4', title: 'Fix navigation bug', status: 'pending', createdAt: new Date().toISOString() },
];

export const tasksApi = {
  getAll: async (): Promise<Task[]> => {
    await delay(600);
    return [...tasksStore];
  },

  toggle: async (id: string): Promise<Task> => {
    await delay(400);
    const task = tasksStore.find((t) => t.id === id);
    if (!task) throw new Error('Task not found');
    tasksStore = tasksStore.map((t) =>
      t.id === id ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' } : t
    );
    return tasksStore.find((t) => t.id === id)!;
  },

  create: async (title: string): Promise<Task> => {
    await delay(500);
    const task: Task = {
      id: Date.now().toString(),
      title,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    tasksStore.push(task);
    return task;
  },
};
