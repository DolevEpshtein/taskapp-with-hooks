const User  = require('../models/user.model');

const signin = (req, res) => {
  User.findOne({
    "email": req.body.email
  }, (err, user) => {

    if (err || !user)
      return res.status('401').json({
        error: "User not found"
      });

    if (!user.authenticate(req.body.password)) {
      return res.status('401').send({
        error: "Email and password don't match."
      });
    }


    const token = user.generateAuthToken();

    res.cookie("t", token, {
      expire: new Date() + 9999
    });

    return res.json({
      token,
      user: {_id: user._id, name: user.name, email: user.email}
    });

  });
}

const signout = (req, res) => {
  res.clearCookie("t");
  return res.status('200').json({
    message: "signed out"
  });
}


module.exports = {
  signin,
  signout
}