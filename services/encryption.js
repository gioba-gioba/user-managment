const util = require("util");
const crypto = require("crypto");

const pbkdf2Async = util.promisify(crypto.pbkdf2);

const encrypt = async (raw, salt) => {
  salt = salt || crypto.randomBytes(30).toString("hex");
  const encrypted = (await pbkdf2Async(raw, salt, 10, 64, "sha512")).toString(
    "hex"
  );

  return {
    encrypted,
    salt,
  };
};

module.exports = {
  encrypt,
};
