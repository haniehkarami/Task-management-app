import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

import TaskForm from "../components/TaskForm";
import Board from "../components/Board";

import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  updateTaskStatus,
} from "../api/tasksApi";
import Modal from "../components/Modal";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [selectedTask, setSelectedTask] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [assigneeFilter, setAssigneeFilter] = useState("");
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const queryClient = useQueryClient();

  const logoutHandler = () => {
    localStorage.removeItem("user");

    navigate("/");
  };

  const dependencyOptions =
    tasks?.map((task) => ({
      id: task.id,
      title: task.title,
    })) || [];

  const createMutation = useMutation({
    mutationFn: createTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      toast.success("Task created successfully");
    },

    onError: () => {
      toast.error("Failed to create task");
    },
  });

  const addTaskHandler = (data) => {
    createMutation.mutate({
      ...data,
      status: "Backlog",
      assignee: user.username,
      createdAt: new Date().toISOString().split("T")[0],
    });
  };

  const deleteMutation = useMutation({
    mutationFn: deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      toast.success("Task deleted");
    },

    onError: () => {
      toast.error("Delete failed");
    },
  });

  const deleteTaskHandler = (id) => {
    setDeleteTaskId(id);
  };
  const confirmDelete = () => {
    deleteMutation.mutate(deleteTaskId);

    setDeleteTaskId(null);

    if (!confirmDelete) return;

    deleteMutation.mutate(id);
  };

  const editTaskHandler = (task) => {
    setSelectedTask(task);
  };

  const updateMutation = useMutation({
    mutationFn: updateTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      setSelectedTask(null);

      toast.success("Task updated");
    },

    onError: () => {
      toast.error("Update failed");
    },
  });

  const filteredTasks =
    tasks?.filter((task) => {
      const matchesSearch = (task.title ?? "")
  .toLowerCase()
  .includes(search.toLowerCase());


      const matchesStatus = !statusFilter || task.status === statusFilter;
      const matchesPriority =
        !priorityFilter || task.priority === priorityFilter;

      const matchesAssignee =
        !assigneeFilter || task.assignee === assigneeFilter;

      return (
        matchesSearch && matchesStatus && matchesPriority && matchesAssignee
      );
    }) || [];

  const sortedTasks = [...filteredTasks];

  if (sortBy === "title") {
    sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (sortBy === "createdAt") {
    sortedTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  if (sortBy === "priority") {
    const priorityOrder = {
      High: 3,
      Medium: 2,
      Low: 1,
    };

    sortedTasks.sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority],
    );
  }

  const dragMutation = useMutation({
    mutationFn: updateTaskStatus,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      toast.success("Status updated");
    },

    onError: () => {
      toast.error("Status update failed");
    },
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;

    const newStatus = result.destination.droppableId;

    dragMutation.mutate({
      id: taskId,
      status: newStatus,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Loading tasks...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-red-500">
          Error loading tasks: {error.message}
        </p>
      </div>
    );
  }
  return (
 <div
  style={{
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "20px",
  }}
>
    <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "10px",
  }}
>
 <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "1px solid #e5e7eb",
  }}
>
  <div>
    <h1
      style={{
        margin: 0,
        fontSize: "32px",
      }}
    >
      Task Management
    </h1>

    <p
      style={{
        marginTop: "6px",
        color: "#6b7280",
      }}
    >
      Welcome back, {user?.username}
    </p>
  </div>


</div>

  <button
    onClick={logoutHandler}
    style={{
      background: "#ef4444",
      color: "white",
      padding: "10px 16px",
      borderRadius: "8px",
    }}
  >
    Logout
  </button>
</div>
    <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(180px,1fr))",
    gap: "10px",
    marginBottom: "20px",
  }}
>
        <input
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>

          <option value="Backlog">Backlog</option>

          <option value="Todo">Todo</option>

          <option value="In Progress">In Progress</option>

          <option value="Review">Review</option>

          <option value="Done">Done</option>
        </select>

        <select
          value={assigneeFilter}
          onChange={(e) => setAssigneeFilter(e.target.value)}
        >
          <option value="">All Assignees</option>

          {[...new Set(tasks?.map((task) => task.assignee))].map((assignee) => (
            <option key={assignee} value={assignee}>
              {assignee}
            </option>
          ))}
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">All Priorities</option>

          <option value="Low">Low</option>

          <option value="Medium">Medium</option>

          <option value="High">High</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort</option>

          <option value="title">Title</option>

          <option value="createdAt">Date Created</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <TaskForm
        onSubmit={addTaskHandler}
        isPending={createMutation.isPending}
        dependencyOptions={dependencyOptions}
      />
      <Board
        tasks={sortedTasks}
        allTasks={tasks}
        onDelete={deleteTaskHandler}
        onEdit={editTaskHandler}
        onDragEnd={handleDragEnd}
      />
      {selectedTask && (
  <Modal
    onClose={() =>
      setSelectedTask(null)
    }
  >
    <h2
      style={{
        marginBottom: "20px",
      }}
    >
      Edit Task
    </h2>

    <TaskForm
      defaultValues={
        selectedTask
      }
      onSubmit={(data) =>
        updateMutation.mutate({
          id: selectedTask.id,
          data,
        })
      }
      isPending={
        updateMutation.isPending
      }
    />
  </Modal>
)}
      {deleteTaskId && (
  <Modal
    onClose={() =>
      setDeleteTaskId(null)
    }
  >
    <div
      style={{
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "60px",
          marginBottom: "10px",
        }}
      >
        ⚠️
      </div>

      <h2
        style={{
          marginBottom: "10px",
        }}
      >
        Delete Task
      </h2>

      <p
        style={{
          color: "#6b7280",
          marginBottom: "24px",
        }}
      >
        Do you want to delete this task?
      </p>

      <div
        style={{
          display: "flex",
          gap: "12px",
        }}
      >
        <button
          onClick={() =>
            setDeleteTaskId(null)
          }
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "10px",
            border:
              "1px solid #ddd",
            background: "#fff",
            color:"black",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>

        <button
          onClick={confirmDelete}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background:
              "#ef4444",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </Modal>
)}
    </div>
  );
}

export default Dashboard;
