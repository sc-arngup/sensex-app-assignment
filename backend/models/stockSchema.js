const mongoose = require("mongoose");
const stockSchema = new mongoose.Schema({
  Date: Date,
  Open: Number,
  Close: Number,
});
const Stock = mongoose.models.Stock || mongoose.model("Stock", stockSchema);
module.exports = Stock;
