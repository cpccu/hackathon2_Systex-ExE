const express = require("express");

const Notice = require("../models/Notice");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ========================================
// GET ALL NOTICES
// ========================================

router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find()
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      notices,
    });
  } catch (error) {
    console.error("Get notices error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load notices.",
    });
  }
});

// ========================================
// CREATE NOTICE
// ========================================

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      date,
    } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing.",
      });
    }

    const allowedCategories = [
      "Class Cancellation",
      "Bus Issue",
      "General",
    ];

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid notice category.",
      });
    }

    const notice = await Notice.create({
      title: title.trim(),
      description: description.trim(),
      category,
      date: date || "",
      postedBy: req.user.userId,
    });

    const populatedNotice = await Notice.findById(
      notice._id
    ).populate("postedBy", "name email");

    res.status(201).json({
      success: true,
      message: "Notice created successfully.",
      notice: populatedNotice,
    });
  } catch (error) {
    console.error("Create notice error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create notice.",
    });
  }
});

// ========================================
// UPDATE OWN NOTICE
// ========================================

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found.",
      });
    }

    if (
      notice.postedBy.toString() !==
      req.user.userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You can only edit your own notices.",
      });
    }

    const {
      title,
      description,
      category,
      date,
    } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing.",
      });
    }

    const allowedCategories = [
      "Class Cancellation",
      "Bus Issue",
      "General",
    ];

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid notice category.",
      });
    }

    notice.title = title.trim();
    notice.description = description.trim();
    notice.category = category;
    notice.date = date || "";

    await notice.save();

    const updatedNotice = await Notice.findById(
      notice._id
    ).populate("postedBy", "name email");

    res.json({
      success: true,
      message: "Notice updated successfully.",
      notice: updatedNotice,
    });
  } catch (error) {
    console.error("Update notice error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update notice.",
    });
  }
});

// ========================================
// DELETE OWN NOTICE
// ========================================

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found.",
      });
    }

    if (
      notice.postedBy.toString() !==
      req.user.userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You can only delete your own notices.",
      });
    }

    await Notice.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Notice deleted successfully.",
    });
  } catch (error) {
    console.error("Delete notice error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete notice.",
    });
  }
});

module.exports = router;