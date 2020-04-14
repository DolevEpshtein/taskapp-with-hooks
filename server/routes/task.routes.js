const express = require('express');
const taskCtrl = require('../controllers/task.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.route('/api/tasks')
  .get(auth, taskCtrl.list)
  .post(auth, taskCtrl.create);

router.route('/api/tasks/:taskId')
  .get(auth, taskCtrl.read)
  .put(auth, taskCtrl.update)
  .delete(auth, taskCtrl.remove);

//  router.param('userId', taskCtrl.taskByID);

module.exports = router;