const express = require("express");

const LostFound = require("../models/LostFound");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const items = await LostFound.find()
      .populate("postedBy", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load lost and found items.",
    });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      type,
      contact,
    } = req.body;

    if (
      !title ||
      !description ||
      !location ||
      !type ||
      !contact
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const item = await LostFound.create({
      title,
      description,
      location,
      type,
      contact,
      postedBy: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully.",
      item,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create post.",
    });
  }
});

module.exports = router;