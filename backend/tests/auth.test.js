const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
require("dotenv").config();

// Mock the User model
jest.mock("../models/Users", () => ({
  findOne: jest.fn(),
}));
const User = require("../models/Users");

// Setup Express app with auth routes
const authRoutes = require("../components/auth");

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

describe("POST /auth/login", () => {
  const SECRET = process.env.JWT_SECRET || "mysecret";
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return JWT token with correct credentials", async () => {
    const mockUser = {
      _id: new mongoose.Types.ObjectId(),
      email: "test@example.com",
      password: "hashed",
    };
    User.findOne.mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
    const res = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "test123",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    const decoded = jwt.verify(res.body.token, SECRET);
    expect(decoded.id).toBe(mockUser._id.toString());
  });

  it("should return 401 for incorrect password", async () => {
    const mockUser = {
      _id: new mongoose.Types.ObjectId(),
      email: "test@example.com",
      password: "hashed",
    };
    User.findOne.mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, "compare").mockResolvedValue(false);
    const res = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "wrongpass",
    });
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toMatch(/invalid/i);
  });
  it("should return 401 for incorrect email", async () => {
    User.findOne.mockResolvedValue(null);
    const res = await request(app).post("/auth/login").send({
      email: "nouser@example.com",
      password: "test123",
    });
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toMatch(/invalid/i);
  });
  it("should return 401 when both email and password are incorrect", async () => {
    User.findOne.mockResolvedValue(null); // No user with such email

    const res = await request(app)
      .post("/auth/login")
      .send({ email: "fake@example.com", password: "wrongpass" });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toMatch(/invalid/i);
  });
});
