import api from "./axios";

export const getTasks = async () => {
  const { data } = await api.get("/tasks");
  return data;
};

export const createTask = async (task) => {
  const { data } = await api.post(
    "/tasks",
    task
  );

  return data;
};

export const deleteTask = async (id) => {
  const { data } = await api.delete(
    `/tasks/${id}`
  );

  return data;
};

export const updateTask = async ({
  id,
  data,
}) => {
  const response = await api.put(
    `/tasks/${id}`,
    data
  );

  return response.data;
};

export const updateTaskStatus =
  async ({
    id,
    status,
  }) => {
    const response =
      await api.patch(
        `/tasks/${id}`,
        { status }
      );

    return response.data;
  };

  