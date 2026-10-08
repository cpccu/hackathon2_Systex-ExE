const express = require("express");

const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ========================================
// GET ALL EVENTS
// ========================================

router.get("/", async (req, res) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      events,
    });
  } catch (error) {
    console.error("Get events error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load events.",
    });
  }
});

// ========================================
// CREATE EVENT
// ========================================

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
      title: title.trim(),
      description: description.trim(),
      date,
      time,
      location: location.trim(),
      organizer: organizer?.trim() || "CampusOS",
      createdBy: req.user.userId,
    });

    const populatedEvent = await Event.findById(
      event._id
    ).populate("createdBy", "name email");

    res.status(201).json({
      success: true,
      message: "Event created successfully.",
      event: populatedEvent,
    });
  } catch (error) {
    console.error("Create event error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create event.",
    });
  }
});

// ========================================
// UPDATE OWN EVENT
// ========================================

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    if (
      event.createdBy.toString() !==
      req.user.userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You can only edit your own events.",
      });
    }

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

    event.title = title.trim();
    event.description = description.trim();
    event.date = date;
    event.time = time;
    event.location = location.trim();
    event.organizer =
      organizer?.trim() || "CampusOS";

    await event.save();

    const updatedEvent = await Event.findById(
      event._id
    ).populate("createdBy", "name email");

    res.json({
      success: true,
      message: "Event updated successfully.",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Update event error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update event.",
    });
  }
});

// ========================================
// DELETE OWN EVENT
// ========================================

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    if (
      event.createdBy.toString() !==
      req.user.userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You can only delete your own events.",
      });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Event deleted successfully.",
    });
  } catch (error) {
    console.error("Delete event error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete event.",
    });
  }
});

module.exports = router;