"use strict";

// const express = require("express");
module.exports = function (app) {
  function logger(req, res, next) {
    console.log(new Date(), req.method, req.url);
    if (req.method === "POST") console.log("Request Parameters : ", req.body);
    next();
  }
  app.use(logger);
  // Insert routes below
  app.get("/healthcheck", (req, res) => res.sendStatus(200));
  app.get("/", (req, res) =>
    res.json({
      message:
        "Server is up. Hit /api-docs endpoint to access the documentation.",
    })
  );

  app.use("/auth", require("./components/auth"));
  app.use(
    "/sensex",
    require("./components/middleware/auth"),
    require("./components/sensex")
  );
};
