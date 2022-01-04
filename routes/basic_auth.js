const { loginUser } = require("../services/users");

const basicAuth = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.sendStatus(401);
  }

  const credentials = Buffer.from(
    authorization.split(" ")[1],
    "base64"
  ).toString("ascii");
  const [nickname, password] = credentials.split(":");

  const profile = await loginUser(nickname, password);
  if (profile) {
    req.profile = profile;
    next();
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  basicAuth,
};
