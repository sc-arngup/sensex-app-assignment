const Stock = require("../../models/stockSchema");
exports.getSensexData = async (page = 1, limit = 30) => {
  const totalcount = await Stock.countDocuments();
  const data = await Stock.find()
    .sort({ Date: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  const hasNextPage = page * limit < totalcount;
  return { data, hasNextPage };
};
exports.createStockEntry = async (Open, Close) => {
  if (Open == null || Close == null) {
    throw new Error("Open and Close values are required");
  }
  const newStock = new Stock({
    Date: new Date(),
    Open,
    Close,
  });
  return await newStock.save();
};

exports.getMonthlyAverages = async () => {
  const data = await Stock.aggregate([
    {
      $group: {
        _id: {
          month: { $month: "$Date" },
        },
        avgClose: { $avg: "$Close" },
      },
    },
    {
      $sort: {
        "_id.month": 1,
      },
    },
  ]);
  const monthNames = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return data.map((item) => ({
    month: monthNames[item._id.month],
    avgClose: parseFloat(item.avgClose.toFixed(2)),
  }));
};

// const sensexService = {
//   getSensexData: async function () {
//     try {
//       return [];
//     } catch (err) {}
//   },
// };

// module.exports = sensexService;
