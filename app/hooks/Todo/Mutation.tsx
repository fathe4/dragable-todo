import Api from "@/app/services/Api";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { GET_TODOS } from "./Constants";
import { createTodo, updateTodo } from "@/app/Types/Todo.type";

export const useCreateTodo = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: ({ title, description, priority, todo_date }: createTodo) =>
      Api.todo.createTodo({
        title,
        description,
        priority,
        todo_date,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_TODOS] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: updateTodo }) =>
      Api.todo.updateTodo(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_TODOS] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: (id: number) => Api.todo.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_TODOS] });
    },
  });
};
