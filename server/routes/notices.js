const express = require("express");

const Notice = require("../models/Notice");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find()
      .populate("postedBy", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      notices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load notices.",
    });
  }
});

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

    const notice = await Notice.create({
      title,
      description,
      category,
      date: date || "",
      postedBy: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Notice created successfully.",
      notice,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create notice.",
    });
  }
});

module.exports = router;