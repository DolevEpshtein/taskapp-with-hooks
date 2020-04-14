const User = require('../models/user.model');
const _ = require('lodash');
const errorHandler = require('./../helpers/dbErrorHandler');

const create = async (req, res, next) => {
  const user = new User(req.body)

  try {
      await user.save()
      const token = await user.generateAuthToken()
      res.status(201).send({ user, token })
  } catch (e) {
      res.status(400).send(e)
  };
};

/**
 * Load user and append to req.
 */
const userByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user)
      return res.status('400').json({
        error: "User not found"
      });
    req.profile = user;
    next();
  });
};

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
}

const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.json(users);
  }).select('name email updated created');
}

const update = (req, res, next) => {
  let user = req.profile;
  user = _.extend(user, req.body);
  user.updated = Date.now();
  user.save((err) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};



const remove = async (req, res) => {
  try {
      const user = await User.findOneAndDelete({ _id: req.profile._id })

      if (!user) {
          res.status(404).send()
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.send(user)
  } catch (e) {
      res.status(500).send()
  }
};

module.exports = {
  create,
  userByID,
  read,
  list,
  remove,
  update
}