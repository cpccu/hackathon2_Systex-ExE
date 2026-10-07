const express = require("express");

const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load events.",
    });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      location,
      organizer,
    } = req.body;

    if (
      !title ||
      !description ||
      !date ||
      !time ||
      !location
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing.",
      });
    }

    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      organizer: organizer || "CampusOS",
      createdBy: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully.",
      event,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create event.",
    });
  }
});

module.exports = router;