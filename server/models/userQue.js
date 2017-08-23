let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let salt = bcrypt.genSaltSync(10);
let Schema = mongoose.Schema

//Schema is the blueprint
let userSchema = new Schema({
  username:{
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  priv: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }
});

userSchema.pre("save", function(next){
  this.password = bcrypt.hashSync(this.password + this.username, salt);
  next();
});



module.exports = mongoose.model("usersQue", userSchema);
