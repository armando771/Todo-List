const router = require('express').Router();

const getTasks = require('../controllers/get');
const postTasks = require('../controllers/post');
const putTasks = require('../controllers/put');
const deleteTasks = require('../controllers/delete');

const validation = require('../middlewares/tasksValidate');

router.get('/', getTasks);

router.post('/', validation, postTasks);

router.put('/:id', validation, putTasks);

router.delete('/:id', deleteTasks);

module.exports = router;
