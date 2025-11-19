export type Priority = "extreme" | "moderate" | "low";

export interface Todo {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  is_completed: boolean;
  position: number;
  todo_date: string;
  created_at: string;
  updated_at: string;
}

export type createTodo = {
  title: string;
  description: string;
  priority: Priority;
  todo_date: string;
};

export type updateTodo = {
  title?: string;
  description?: string;
  priority?: Priority;
  todo_date?: string;
  is_completed?: boolean;
  position?: number;
};

export type todoFilters = {
  is_completed?: boolean;
  priority?: Priority;
  todo_date?: string;
  search?: string;
};
