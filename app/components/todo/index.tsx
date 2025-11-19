"use client";

import { Priority, Todo } from "@/app/Types/Todo.type";
import { TodoCard } from "./TodoCard";
import { SearchBar } from "../common/SearchBar";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { Modal } from "../common/Modal";
import { TodoForm } from "./TodoForm";
import Title from "../common/Title";
import { useGetTodos } from "@/app/hooks/Todo/Query";
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from "@/app/hooks/Todo/Mutation";
import { FilterPanel, FilterState } from "./FilterPanel";
import { prepareFilterParams } from "../../utils/FilterUtils";

export const TodoPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({});
  const [localTodos, setLocalTodos] = useState<Todo[]>([]);
  const [draggedTodo, setDraggedTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const apiFilters = prepareFilterParams(filters);

  const { data: todoList, isLoading } = useGetTodos(apiFilters);
  const { mutate: createTodo } = useCreateTodo();
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  useEffect(() => {
    if (todoList) {
      setLocalTodos(todoList);
    }
  }, [todoList]);

  // Search handler with debounce
  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
    }));
  };

  // Filter change handler
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  // Drag and Drop Handlers
  const handleDragStart = (todo: Todo) => (e: React.DragEvent) => {
    setDraggedTodo(todo);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setDraggedTodo(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (targetTodo: Todo) => (e: React.DragEvent) => {
    e.preventDefault();

    if (!draggedTodo || draggedTodo.id === targetTodo.id) return;

    const newTodos = [...localTodos];
    const draggedIndex = newTodos.findIndex((t) => t.id === draggedTodo.id);
    const targetIndex = newTodos.findIndex((t) => t.id === targetTodo.id);

    // Remove dragged item
    const [removed] = newTodos.splice(draggedIndex, 1);
    // Insert at new position
    newTodos.splice(targetIndex, 0, removed);

    // Update positions
    const updatedTodos = newTodos.map((todo, index) => ({
      ...todo,
      position: index + 1,
    }));

    setLocalTodos(updatedTodos);
    setDraggedTodo(null);
  };

  // CRUD Operations
  const handleToggleComplete = (id: number) => {
    const todo = localTodos.find((t) => t.id === id);
    if (todo) {
      updateTodo({
        id: id,
        updates: {
          is_completed: !todo.is_completed,
        },
      });

      // Optimistic update
      setLocalTodos(
        localTodos.map((t) =>
          t.id === id ? { ...t, is_completed: !t.is_completed } : t
        )
      );
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this todo?")) {
      deleteTodo(id);
      // Optimistic update
      setLocalTodos(localTodos.filter((t) => t.id !== id));
    }
  };

  const handleEdit = (id: number) => {
    const todo = localTodos.find((t) => t.id === id);
    if (todo) {
      setEditingTodo(todo);
      setIsModalOpen(true);
    }
  };

  const handleFormSubmit = (
    data: Omit<
      Todo,
      "id" | "is_completed" | "position" | "created_at" | "updated_at"
    >
  ) => {
    if (editingTodo) {
      updateTodo({
        id: editingTodo.id!,
        updates: {
          title: data.title,
          description: data.description,
          priority: data.priority,
          todo_date: data.todo_date,
        },
      });
    } else {
      createTodo({
        title: data.title,
        description: data.description,
        priority: data.priority,
        todo_date: data.todo_date,
      });
    }

    setIsModalOpen(false);
    setEditingTodo(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
  };

  const handleNewTask = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <div className="px-6 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="py-4">
            <Title title={"Todos"} size="h2" />
          </div>
          <button
            onClick={handleNewTask}
            className="bg-[#5272FF] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#3a5bee] transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Task
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1">
            <SearchBar
              value={filters.search || ""}
              onChange={handleSearchChange}
            />
          </div>

          <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
        </div>
      </div>

      {/* Todo List */}
      <div className="px-6 py-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Your Tasks {!isLoading && `(${localTodos.length})`}
          </h2>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {localTodos.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                No tasks found. Create a new task to get started!
              </div>
            ) : (
              localTodos.map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  onEdit={() => handleEdit(todo.id)}
                  onDelete={() => handleDelete(todo.id)}
                  onToggleComplete={() => handleToggleComplete(todo.id)}
                  onDragStart={handleDragStart(todo)}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop(todo)}
                  isDragging={draggedTodo?.id === todo.id}
                />
              ))
            )}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTodo ? "Edit Task" : "Add New Task"}
      >
        <TodoForm
          onSubmit={handleFormSubmit}
          onCancel={handleCloseModal}
          initialData={editingTodo || undefined}
        />
      </Modal>
    </div>
  );
};
