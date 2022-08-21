export interface ITask {
  id: number;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  user: {
    email: string;
    username: string;
    id: number;
  };
}
