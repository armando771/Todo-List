const connection = require('../connection');

const createNewTask = async (taskName, taskContent, taskStatus) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('TodoList').insertOne({ taskName, taskContent, taskStatus }));
  return { id: insertedId, taskName, taskContent, taskStatus }
}

module.exports = createNewTask;
