"use strict";
const express = require("express");
const router = express.Router();
const authCtrl = require("./auth.controller");
router.post("/login", authCtrl.login);
module.exports = router;
// router.post("/login", (req, res) => {
//   console.log("Data", req.body);
//   let exists = false;
//   users.forEach((user) => {
//     if (user.email === req.body.email && user.pass === req.body.pass) {
//       exists = true;
//     }
//   });
//   console.log("Params", req.params);
//   console.log("Query", req.query);
//   if (exists) {
//     res.status(200).json({ message: "User exists", status: "success" });
//   } else {
//     res.status(401).json({ message: "User not exists", status: "failed" });
//   }
// });
