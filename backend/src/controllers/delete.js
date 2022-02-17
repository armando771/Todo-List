const deleteTask = require('../models/tasks/delete');

const deleteTaskById = async (request, response) => {
  const { id } = request.params;
  const taskDeleted = await deleteTask(id);
  return response.status(200).json(taskDeleted);
};

module.exports = deleteTaskById;
