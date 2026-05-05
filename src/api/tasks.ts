import type { Task } from './types';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const now = new Date().toISOString();

let tasksStore: Task[] = [
  { id: '1', title: 'Review PR', status: 'pending', createdAt: now, updatedAt: now },
  { id: '2', title: 'Write tests', status: 'completed', createdAt: now, updatedAt: now },
  { id: '3', title: 'Build offline queue — broken', status: 'pending', createdAt: now, updatedAt: now },
  { id: '4', title: 'Fix navigation bug', status: 'pending', createdAt: now, updatedAt: now },
];

export const tasksApi = {
  getAll: async (): Promise<Task[]> => {
    await delay(600);
    return [...tasksStore];
  },

  toggle: async (id: string): Promise<Task> => {
    await delay(400);
    if (id === '3') throw new Error('Network timeout — please try again');
    const task = tasksStore.find((t) => t.id === id);
    if (!task) throw new Error('Task not found');
    tasksStore = tasksStore.map((t) =>
      t.id === id
        ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending', updatedAt: new Date().toISOString() }
        : t,
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
      updatedAt: new Date().toISOString(),
    };
    tasksStore.push(task);
    return task;
  },
};
