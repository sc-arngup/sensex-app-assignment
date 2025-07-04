"use strict";
const express = require("express");
const router = express.Router();
const controller = require("./sensex.controller");
router.get("/", controller.getSensex);
router.post("/", controller.addEntry);
router.get("/monthly-averages", controller.getMonthlyAverages);
module.exports = router;
