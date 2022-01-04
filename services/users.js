const { encrypt } = require("./encryption");
const { Users } = require("../db");

const userToObject = (model) => {
  const obj = model.toObject();
  delete obj.password;
  delete obj.salt;
  delete obj._id;
  delete obj.__v;

  return obj;
};

const registerUser = async (nickname, firstname, lastname, password) => {
  const existingUser = await Users.findOne({
    nickname,
  });
  if (existingUser) {
    return null;
  }

  const { encrypted: encryptedPassword, salt } = await encrypt(password);

  const user = new Users({
    nickname,
    firstname,
    lastname,
    password: encryptedPassword,
    salt,
  });
  await user.save();

  return userToObject(user);
};

const loginUser = async (nickname, password) => {
  const user = await Users.findOne({
    nickname,
  });
  if (!user) {
    return null;
  }

  const { encrypted: encryptedPassword } = await encrypt(password, user.salt);

  if (encryptedPassword === user.password) {
    return userToObject(user);
  } else {
    return null;
  }
};

const updateUser = async (nickname, firstname, lastname, password) => {
  const user = await Users.findOne({
    nickname,
  });
  if (!user) {
    return null;
  }

  user.firstname = firstname || user.firstname;
  user.lastname = lastname || user.lastname;
  if (password) {
    const { encrypted: encryptedPassword, salt } = await encrypt(password);
    user.password = encryptedPassword;
    user.salt = salt;
  }
  await user.save();

  return userToObject(user);
};

const getUser = async (nickname) => {
  const user = await Users.findOne({
    nickname,
  });
  if (!user) {
    return null;
  }

  return userToObject(user);
};

const listUser = async (page, size) => {
  const users = await Users.find()
    .sort({ _id: "asc" })
    .skip((page - 1) * size)
    .limit(size);

  return users.map(userToObject);
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getUser,
  listUser,
};
