import Api from "@/app/services/Api";
import { useQuery } from "@tanstack/react-query";
import { GET_TODOS } from "./Constants";
import { todoFilters } from "@/app/Types/Todo.type";

export const useGetTodos = (params?: todoFilters) =>
  useQuery({
    queryKey: [GET_TODOS, params],
    queryFn: () => Api.todo.getTodos(params),
  });
