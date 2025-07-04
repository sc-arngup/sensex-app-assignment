const fs = require("fs");
const csv = require("csv-parser");

const Stock = require("../models/stockSchema");

const importIfEmpty = async () => {
  const count = await Stock.countDocuments();
  if (count > 0) {
    console.log(`Stock collection already populated. Skipping import.`);
    return;
  }
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream("./assets/Sensex_CSV_2018 - CSVForDate (3) (1).csv")
      .pipe(csv())
      .on("data", (data) => {
        results.push({
          Date: new Date(data["Date"]),
          Open: parseFloat(data["Open"]),
          Close: parseFloat(data["Close"]),
        });
      })
      .on("end", async () => {
        await Stock.insertMany(results.sort((a, b) => b.Date - a.Date));
        console.log(`CSV data inserted`);
        resolve();
      })
      .on("error", reject);
  });
};
module.exports = importIfEmpty;
