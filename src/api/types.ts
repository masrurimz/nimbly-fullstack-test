export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'completed';
  createdAt: string;
  createdAt: string;

export type TaskFilter = 'all' | 'pending' | 'completed';
