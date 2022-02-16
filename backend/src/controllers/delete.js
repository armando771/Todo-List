const deleteTask = require('../models/tasks/delete');

const deleteTaskById = async (request, response) => {
  const { id } = request.params;
  const taskDeleted = await deleteTask(id);
  if (taskDeleted.err) {
    return response
      .status(422)
      .json({ err: { code: taskDeleted.err.code, message: taskDeleted.err.message } });
  }
  return response.status(200).json(taskDeleted);
};

module.exports = deleteTaskById;
