const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/Users");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/sensex";
const seedUsers = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
    const users = [
      { username: "Arnav", email: "arnav@example.com", password: "pass123" },
      { username: "Neha", email: "neha@example.com", password: "secure456" },
      { username: "Rahul", email: "rahul@example.com", password: "stock789" },
      { username: "Priya", email: "priya@example.com", password: "mypwd321" },
      {
        username: "Vikram",
        email: "vikram@example.com",
        password: "jwtuser2024",
      },
    ];
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );
    await User.insertMany(hashedUsers);
    console.log("Seeded 5 users successfully");
  } catch (err) {
    console.error("Error seeding users:", err);
  }
};
module.exports = seedUsers;
