const { ObjectID } = require('mongodb');
const connection = require('../connection');

const updateTaskById = async (id, task) => {
  const { taskName, taskContent, taskStatus } = task;
  await connection()
   .then((db) => db
     .collection('TodoList').updateOne({ _id: ObjectID(id) }, { $set: { taskName, taskContent, taskStatus } }));
  return { _id: id, taskName, taskContent, taskStatus }
}

module.exports = updateTaskById;
