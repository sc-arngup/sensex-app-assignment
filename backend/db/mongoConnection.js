const mongoose = require("mongoose");
require("dotenv").config();
const connectMongo = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};
module.exports = connectMongo;
