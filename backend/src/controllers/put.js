const putTasks = require('../models/tasks/put');

const updateTaskById = async (request, response) => {
  const { id } = request.params;
  const { taskName, taskContent, taskStatus } = request.body;
  const task = { taskName, taskContent, taskStatus };
  const taskUpdated = await putTasks(id, task);
  return response.status(200).json(taskUpdated);
};

module.exports = updateTaskById;
