import { createTodo, todoFilters, updateTodo, Todo as TodoType } from "@/app/Types/Todo.type";
import Api from ".";

const Todo = (api: typeof Api) => ({
  getTodos: (params?: todoFilters) => api.get("/api/todos/", params || {}, {}) as Promise<TodoType[]>,

  createTodo: ({ title, description, priority, todo_date }: createTodo) =>
    api.post("/api/todos/", {}, { title, description, priority, todo_date }),

  updateTodo: (id: number, updates: updateTodo) =>
    api.patch(`/api/todos/${id}/`, {}, updates),

  deleteTodo: (id: number) => api.delete(`/api/todos/${id}/`, {}, {}),
});

export default Todo;
