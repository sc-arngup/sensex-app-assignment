"use strict";
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();
const cors = require("cors");
// const users = [{ email: "b@gmail.com", pass: "abcd" }];
// const config = require("./config/env");
const bodyParser = require("body-parser");
const connectMongo = require("./db/mongoConnection");
const importIfEmpty = require("./scripts/populateData");
const seedUsers = require("./scripts/populateUsers");
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  const app = express();

  try {
    app.use(cors());
    // app.use(express.json());
    // app.use(express.json({ limit: "50mb" }));
    app.use(bodyParser.json({ limit: "50mb" }));

    //connect Database
    //Call a JS script(if collection already has data then no touching) that will fetch data from csv and store it in the mongodb

    await connectMongo();
    console.log("MongoDB connected");

    await importIfEmpty();
    await seedUsers();

    // server code to start
    const server = http.createServer(app);
    const io = socketIo(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    app.set("socketio", io);

    require("./routes")(app);
    app.use((err, req, res, next) => {
      if (err.status === 401) {
        res.status(401).json({ error: "Unauthorized" });
      } else {
        res.status(500).json({ error: "Server error" });
      }
    });
    // app.listen(PORT, () => {
    //   console.log(`Server is running on http://localhost:${PORT}`);
    // });
    server.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
    io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);
      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });
  } catch (error) {
    console.error("Failed to resolve references:", error);
  }

  // Expose app
  // exports = module.exports = app;
};

startServer();
// require("./routes")(app);
