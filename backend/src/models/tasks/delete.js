const { ObjectID } = require('mongodb');
const connection = require('../connection');

const deleteTaskById = async (id) => {
  if (ObjectID.isValid(id)) {
    const taskDeleted = await connection()
      .then((db) => db.collection('TodoList').deleteOne({ _id: ObjectID(id) }));
    return taskDeleted;
  }
  return null;
}

module.exports = deleteTaskById;
