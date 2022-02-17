import axios from 'axios';

const API_URL = 'http://localhost:3001/task/';

const createTask = async (task) => {
  const { data } = await axios.post(API_URL, task);
  return data;
};

const deleteTask = async (id) => {
  const deleted = await axios.delete(`${API_URL}${id}`);
  return deleted;
};

const updatedTask = async (id, updatedTodo) => {
  const { data } = await axios.put(`${API_URL}${id}`, updatedTodo);
  return data;
};

const getAllTasks = async () => {
  const { data: list } = await axios.get(API_URL);
  return list;
};

const exports = { createTask, deleteTask, updatedTask, getAllTasks }

export default exports
