const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const authRoutes = require("./routes/auth");
const resourceRoutes = require("./routes/resources");
const lostFoundRoutes = require("./routes/lostFound");
const noticeRoutes = require("./routes/notices");
const eventRoutes = require("./routes/events");

const app = express();

const PORT = process.env.PORT || 5001;

/* =========================================
   MIDDLEWARE
========================================= */

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());


/* =========================================
   BASIC ROUTES
========================================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CampusOS Backend is running!",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CampusOS API is healthy!",
  });
});


/* =========================================
   API ROUTES
========================================= */

app.use("/api/auth", authRoutes);

app.use("/api/resources", resourceRoutes);

app.use("/api/lost-found", lostFoundRoutes);

app.use("/api/notices", noticeRoutes);

app.use("/api/events", eventRoutes);


/* =========================================
   DATABASE + SERVER
========================================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(
        `CampusOS server running on port ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:");
    console.error(error.message);

    process.exit(1);
  });