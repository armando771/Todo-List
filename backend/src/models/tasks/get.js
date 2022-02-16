const connection = require('../connection');

const getAllTasks = async () => {
  const allTasks = await connection()
    .then((db) => db.collection('TodoList').find({}).toArray());
  return allTasks;
}

module.exports = getAllTasks;
