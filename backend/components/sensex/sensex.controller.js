"use strict";
const sensexService = require("./sensex.service");
exports.getSensex = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const { data, hasNextPage } = await sensexService.getSensexData(page);
    res.status(200).json({ stocks: data, hasNextPage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.addEntry = async (req, res) => {
  try {
    const { Open, Close } = req.body;
    const newStock = await sensexService.createStockEntry(Open, Close);
    const io = req.app.get("socketio");
    io.emit("new-stock");
    res.status(201).json(newStock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.getMonthlyAverages = async (req, res) => {
  try {
    const result = await sensexService.getMonthlyAverages();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
