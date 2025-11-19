import { Todo } from "@/app/Types/Todo.type";
import { Check, GripVertical, Pencil, Trash2, X } from "lucide-react";
import { PriorityBadge } from "./PriorityBadge";

export const TodoCard: React.FC<{
  todo: Todo;
  onEdit: () => void;
  onDelete: () => void;
  onToggleComplete: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  isDragging: boolean;
}> = ({
  todo,
  onEdit,
  onDelete,
  onToggleComplete,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  isDragging,
}) => {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`bg-white border border-gray-200 rounded-lg p-4 transition-all ${
        isDragging ? "opacity-50" : "opacity-100"
      } hover:shadow-md cursor-move`}
    >
      <div className="flex items-start gap-1 p-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3
              className={`font-semibold text-gray-900 ${
                todo.is_completed ? "line-through" : ""
              }`}
            >
              {todo.title}
            </h3>
            <PriorityBadge priority={todo.priority} />
          </div>

          <p className="text-sm text-gray-600 mb-3">{todo.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Due{" "}
              {new Date(todo.todo_date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={onToggleComplete}
                className={`p-1.5 rounded hover:bg-gray-100 ${
                  todo.is_completed ? "text-green-600" : "text-gray-400"
                }`}
                title={todo.is_completed ? "Mark incomplete" : "Mark complete"}
              >
                {todo.is_completed ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <X className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={onEdit}
                className="p-1.5 text-blue-600 rounded hover:bg-blue-50"
                title="Edit"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={onDelete}
                className="p-1.5 text-red-600 rounded hover:bg-red-50"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <GripVertical className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
      </div>
    </div>
  );
};
