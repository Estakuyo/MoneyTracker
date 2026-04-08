require("dotenv").config();
const db = require("./config/db_connection");
const express = require("express");
const cors = require("cors");
const app = express();

// Import Routes
const authRoutes = require("./routes/authRoutes");
const earningsRoutes = require("./routes/earningsRoutes");

// Middleware
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  }),
);
app.use(express.json()); // Parses JSON to readable data

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api", earningsRoutes);

// Check Database Connection
const startServer = async () => {
  try {
    await db.execute("SELECT 1");
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening to PORT ${process.env.PORT}`);
      console.log("Connected to Database!");
    });
  } catch (error) {
    console.log("Failed to connect to database");
    process.exit(1);
  }
};

// Runs the server
startServer();
