
let express = require("express");
let authRouter = express.Router();
let expressJwt = require("express-jwt");

//import settings
let settings = require("../config/settings.js");

let authorization = expressJwt({secret: settings.secret});

//import privs
let admin = require("../middleware/admin.js");

//import user model
let User = require("../models/user.js");
let UserQue = require("../models/userQue.js");

//import passport modules
let passport = require("passport");
let Strategy = require("passport-local");

let jwt = require("jsonwebtoken");

passport.use(new Strategy((username, password, done) => {
  User.findOne({
    username
  }, (err, currentUser) => {
    if (err) {
      done(err, false);
    } else if (currentUser === null) {
      done(null, false);
    } else {
      currentUser.auth(password, (isCorrect) => {
        if (isCorrect) {
          done(null, true);
        } else {
          done(null, false);
        }
      });
    }
  });
}));

//startup passport
authRouter.use(passport.initialize());

/* Login and signup Section */
/*--------------*/

//login as a user
authRouter.post("/login", passport.authenticate("local", {session: false}), (req, res) => {
  User.findOne({
    username: req.body.username
  }, (err, data) => {
    if (err) {
      res.status(500).send({"message": "Error", err});
    } else if (data === null) {
      res.status(404).send({"message": "No user found with this username"});
    } else {
      let payload = {
        username: data.username,
        priv: data.priv
      };
      res.status(201).send({
        "message": "Success, Auth token issued",
        "token": jwt.sign(payload, settings.secret, {
          expiresIn: 30 * 60
        }),
        "priv": data.priv
      });
    }
  })
});

//post a new user to user que
authRouter.post("/signup", (req, res) => {
  User.findOne({
    username: req.body.username
  }, (err, result) => {
    if (err) {
      res.status(500).send({"message": "Err in system", err});
    } else if (result !== null) {
      res.status(400).send({"message": "Username is already taken"});
    } else {
      User.findOne({
        username: req.body.username
      }, (err, data) => {
        if (err) {
          res.status(500).send({"message": "Err in system", err});
        } else if (data !== null) {
          res.status(400).send({"message": "Username is already taken"});
        } else {
          let makeUser = new UserQue(req.body);
          makeUser.save((err, data) => {
            if (err) {
              res.status(500).send({"message": "Err in system", err});
            } else {
              res.status(201).send({"message": `User was added to userque with username of ${data.username}`});
            }
          });
        }
      })
    }
  });
});

/* Admin Section */
/*--------------*/

//get users in user que
authRouter.get("/userque", authorization, admin, (req, res) => {
  UserQue.find({}, (err, data) => {
    if (err) {
      res.status(500).send({"message": "Err in system", err});
    } else {
      let filterData = data.map((item) => {
        return Object.assign(item, {password: "N\A"});
      });
      res.status(200).send({"message": "Success user que", data: filterData});
    }
  });
});

//post a new user from userque to users
authRouter.post("/userque", authorization, admin, (req, res) => {
  UserQue.findOne({
    username: req.body.username
  }, (err, data) => {
    if (err) {
      res.status(500).send({"message": "Err in system", err});
    } else if (data === null) {
      res.status(200).send({"message": `No User in userque with name of ${req.body.username} was found`});
    } else {
      let newUser = new User({username: data.username, password: data.password, priv: req.body.priv});
      newUser.save((err, user) => {
        if (err) {
          res.status(500).send({"message": "Err in system", err});
        } else {
          data.remove((err, result) => {
            if (err) {
              res.status(500).send({"message": "Err in system", err});
            } else {
              res.status(201).send({"message": `User was created with username of ${user.username} and removed from user que`});
            }
          });
        }
      });
    }
  });
});

//delete a user from userque
authRouter.delete("/userque/:id", authorization, admin, (req, res) => {
  UserQue.findByIdAndRemove({
    _id: req.params.id
  }, (err, data) => {
    if (err) {
      res.status(500).send({"message": "Err in system", err});
    } else if (data === null) {
      res.status(404).send({"message": `User with id of ${req.params.id} was not found`});
    } else {
      res.status(200).send({"message": `User was deleted with username of ${data.username}`});
    }
  });
});

//get users in current users
authRouter.get("/user", authorization, admin, (req, res) => {
  User.find({}, (err, data) => {
    if (err) {
      res.status(500).send({"message": "Err in system", err});
    } else {
      let filterData = data.map((item) => {
        return Object.assign(item, {password: "N\A"});
      });
      res.status(200).send({"message": "Success current users", data: filterData});
    }
  });
});

//delete a current user
authRouter.delete("/user/:id", authorization, admin, (req, res) => {
  User.findByIdAndRemove({
    _id: req.params.id
  }, (err, data) => {
    if (err) {
      res.status(500).send({"message": "Err in system", err});
    } else if (data === null) {
      res.status(404).send({"message": `User with id of ${data._id} was not found`});
    } else {
      res.status(200).send({"message": `User was deleted with username of ${data.username}`});
    }
  });
});

module.exports = authRouter;
