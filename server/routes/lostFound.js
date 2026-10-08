const express = require("express");

const LostFound = require("../models/LostFound");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ========================================
// GET ALL
// ========================================

router.get("/", async (req, res) => {
  try {
    const items = await LostFound.find()
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      items,
    });
  } catch (error) {
    console.error("Get lost/found error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load lost and found items.",
    });
  }
});

// ========================================
// CREATE
// ========================================

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

    if (type !== "Lost" && type !== "Found") {
      return res.status(400).json({
        success: false,
        message: "Invalid post type.",
      });
    }

    const item = await LostFound.create({
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      type,
      contact: contact.trim(),
      postedBy: req.user.userId,
    });

    const populatedItem = await LostFound.findById(
      item._id
    ).populate("postedBy", "name email");

    res.status(201).json({
      success: true,
      message: "Post created successfully.",
      item: populatedItem,
    });
  } catch (error) {
    console.error("Create lost/found error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create post.",
    });
  }
});

// ========================================
// UPDATE OWN POST
// ========================================

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const item = await LostFound.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    if (
      item.postedBy.toString() !==
      req.user.userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You can only edit your own posts.",
      });
    }

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

    if (type !== "Lost" && type !== "Found") {
      return res.status(400).json({
        success: false,
        message: "Invalid post type.",
      });
    }

    item.title = title.trim();
    item.description = description.trim();
    item.location = location.trim();
    item.type = type;
    item.contact = contact.trim();

    await item.save();

    const updatedItem = await LostFound.findById(
      item._id
    ).populate("postedBy", "name email");

    res.json({
      success: true,
      message: "Post updated successfully.",
      item: updatedItem,
    });
  } catch (error) {
    console.error("Update lost/found error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update post.",
    });
  }
});

// ========================================
// DELETE OWN POST
// ========================================

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const item = await LostFound.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    if (
      item.postedBy.toString() !==
      req.user.userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You can only delete your own posts.",
      });
    }

    await LostFound.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Post deleted successfully.",
    });
  } catch (error) {
    console.error("Delete lost/found error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete post.",
    });
  }
});

module.exports = router;