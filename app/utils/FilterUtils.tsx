import { todoFilters } from "@/app/Types/Todo.type";
import { FilterState } from "../components/todo/FilterPanel";

export const prepareFilterParams = (filters: FilterState): todoFilters => {
  const params: todoFilters = {};

  if (filters.search) {
    params.search = filters.search;
  }

  if (filters.priority) {
    params.priority = filters.priority;
  }

  if (filters.is_completed !== undefined) {
    params.is_completed = filters.is_completed;
  }

  if (filters.dateFilter) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let targetDate: Date;

    switch (filters.dateFilter) {
      case "today":
        targetDate = today;
        break;
      case "5days":
        targetDate = new Date(today);
        targetDate.setDate(today.getDate() + 5);
        break;
      case "10days":
        targetDate = new Date(today);
        targetDate.setDate(today.getDate() + 10);
        break;
      case "30days":
        targetDate = new Date(today);
        targetDate.setDate(today.getDate() + 30);
        break;
      default:
        targetDate = today;
    }

    params.todo_date = targetDate.toISOString().split("T")[0];
  }

  return params;
};

export const hasActiveFilters = (filters: FilterState): boolean => {
  return (
    filters.is_completed !== undefined ||
    filters.priority !== undefined ||
    filters.dateFilter !== undefined ||
    (filters.search !== undefined && filters.search.length > 0)
  );
};

export const resetFilters = (keepSearch?: string): FilterState => {
  return {
    search: keepSearch || undefined,
  };
};
