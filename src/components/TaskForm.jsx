import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { PRIORITIES } from "../utils/constants";

function TaskForm({
  onSubmit,
  isPending,
  defaultValues,
  dependencyOptions = [],
}) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const submitHandler = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <input
        type="text"
        placeholder="Task Title"
        {...register("title")}
        style={{
          padding: "12px",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      />

      <textarea
        placeholder="Description"
        {...register("description")}
        style={{
          padding: "12px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          minHeight: "120px",
          resize: "vertical",
        }}
      />

      <select
        {...register("priority")}
        style={{
          padding: "12px",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      >
        {PRIORITIES.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>

      <select
        {...register("dependencyId")}
        style={{
          padding: "12px",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      >
        <option value="">
          No Dependency
        </option>

        {dependencyOptions.map((task) => (
          <option
            key={task.id}
            value={task.id}
          >
            {task.title}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={isPending}
        style={{
          background: "#2563eb",
          color: "#fff",
          padding: "12px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        {isPending
          ? "Saving..."
          : defaultValues
          ? "Update Task"
          : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;