import { Priority } from "@/app/Types/Todo.type";

export const PriorityBadge: React.FC<{ priority: Priority }> = ({
  priority,
}) => {
  const colors = {
    extreme: "bg-red-100 text-red-700",
    moderate: "bg-green-100 text-green-700",
    low: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-sm text-xs font-medium ${colors[priority]}`}
    >
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};
