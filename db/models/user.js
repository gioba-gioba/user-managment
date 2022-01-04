const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema({
  nickname: {
    type: String,
    unique: true,
  },
  firstname: String,
  lastname: String,
  salt: String,
  password: String,
});
const Users = mongoose.model("users", usersSchema);
module.exports = Users;
