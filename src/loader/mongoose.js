const mongoose = require("mongoose");
const config = require("../config");
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

module.exports = async () => {
  try {
    await mongoose.connect(config.databaseURL, options);
    console.log("db connected");
  } catch (e) {
    console.error(e);
  }
};
