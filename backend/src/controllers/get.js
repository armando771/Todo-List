const getTasks = require('../models/tasks/get');

const getAllTasks = async (_request, response) => {
  const allTasks = await getTasks();
  return response.status(200).json({ tasks: allTasks });
};

module.exports = getAllTasks
