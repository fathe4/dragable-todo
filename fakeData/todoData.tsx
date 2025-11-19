import { Todo } from "@/app/Types/Todo.type";

export const MOCK_TODOS: Todo[] = [
  {
    id: 1,
    title: "Backend Infrastructure",
    description: "Upgrading backend infrastructure for better performance",
    priority: "extreme",
    is_completed: false,
    position: 1,
    todo_date: "2025-04-15",
    created_at: "2025-11-09T18:52:41.723930Z",
    updated_at: "2025-11-09T18:54:52.241995Z",
  },
  {
    id: 2,
    title: "Mobile App Redesign",
    description:
      "Redesigning the mobile app interface for better user experience",
    priority: "moderate",
    is_completed: false,
    position: 2,
    todo_date: "2025-03-25",
    created_at: "2025-11-09T18:55:37.556474Z",
    updated_at: "2025-11-09T18:55:37.556474Z",
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description: "Creating a new analytics dashboard for clients",
    priority: "low",
    is_completed: true,
    position: 3,
    todo_date: "2025-03-30",
    created_at: "2025-11-09T18:55:42.408634Z",
    updated_at: "2025-11-09T18:55:42.408634Z",
  },
];
