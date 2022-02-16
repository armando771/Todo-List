const postTasks = require('../models/tasks/post');

const createNewTask = async (request, response) => {
  const { taskName, taskContent, taskStatus } = request.body;
  const newTask = await postTasks(taskName, taskContent, taskStatus);
  if (newTask.err) {
    return response
      .status(422)
      .json({ err: { code: newTask.err.code, message: newTask.err.message } });
  }
  return response.status(201).json(newTask);
};

module.exports = createNewTask;
