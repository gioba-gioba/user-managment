const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to db");
  } catch (error) {
    console.error("Db Connection fialed ", error);

    throw error;
  }
};

module.exports = connect;
