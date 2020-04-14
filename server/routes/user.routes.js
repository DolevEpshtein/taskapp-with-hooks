const express = require('express');
const userCtrl = require('../controllers/user.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create);

router.route('/api/users/:userId')
  .get(auth, userCtrl.read)
  .put(auth, userCtrl.update)
  .delete(auth, userCtrl.remove);

router.param('userId', userCtrl.userByID);

module.exports = router;