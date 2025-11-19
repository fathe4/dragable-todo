"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../common/InputField";
import { Button } from "../common/Button";
import { Priority, Todo } from "@/app/Types/Todo.type";
import { Trash2 } from "lucide-react";

const PRIORITY_OPTIONS = [
  {
    value: "extreme",
    label: "Extreme",
    borderBgClass: "border-red-500 bg-red-500",
  },
  {
    value: "moderate",
    label: "Moderate",
    borderBgClass: "border-green-500 bg-green-500",
  },
  {
    value: "low",
    label: "Low",
    borderBgClass: "border-yellow-500 bg-yellow-500",
  },
] as const;

interface TodoFormData {
  title: string;
  todo_date: string;
  priority: Priority;
  description: string;
}

interface TodoFormProps {
  onSubmit: (data: TodoFormData) => void;
  onCancel: () => void;
  initialData?: Todo;
  loading?: boolean;
}

export const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TodoFormData>({
    defaultValues: initialData
      ? {
          title: initialData.title,
          todo_date: initialData.todo_date,
          priority: initialData.priority,
          description: initialData.description,
        }
      : {
          title: "",
          todo_date: "",
          priority: "moderate",
          description: "",
        },
  });

  const selectedPriority = watch("priority");

  const handlePriorityChange = (priority: Priority) => {
    setValue("priority", priority);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        label="Title"
        name="title"
        placeholder="Enter task title"
        register={register}
        error={errors.title}
      />

      <div className="mb-4">
        <label
          htmlFor="todo_date"
          className="block text-sm font-semibold text-black mb-2"
        >
          Date
        </label>
        <input
          id="todo_date"
          type="date"
          {...register("todo_date", { required: "Date is required" })}
          className={`w-full px-4 py-3 border text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
            errors.todo_date ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.todo_date && (
          <p className="mt-1 text-sm text-red-500">
            {errors.todo_date.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-black mb-2">
          Priority
        </label>
        <div className="flex gap-4">
          {PRIORITY_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                value={option.value}
                {...register("priority")}
                checked={selectedPriority === option.value}
                onChange={() => handlePriorityChange(option.value as Priority)}
                className="hidden"
              />
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  selectedPriority === option.value
                    ? option.borderBgClass
                    : "border-gray-300"
                }`}
              >
                {selectedPriority === option.value && (
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                )}
              </span>
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm text-black mb-2 font-bold"
        >
          Task Description
        </label>
        <textarea
          id="description"
          placeholder="Start writing here..."
          {...register("description")}
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
        />
      </div>

      <div className="flex gap-3 pt-2 justify-between">
        <Button type="submit" loading={loading} size="medium">
          {initialData ? "Update" : "Done"}
        </Button>
        <Button type="button" onClick={onCancel} color="red" size="small">
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>
    </form>
  );
};
