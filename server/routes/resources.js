const express = require("express");

const Resource = require("../models/Resource");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ========================================
// GET ALL RESOURCES
// ========================================

router.get("/", async (req, res) => {
  try {
    const resources = await Resource.find()
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      resources,
    });

  } catch (error) {
    console.error("Get resources error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load resources.",
    });
  }
});


// ========================================
// CREATE RESOURCE
// ========================================

router.post(
  "/",
  authMiddleware,
  async (req, res) => {
    try {

      const {
        title,
        course,
        semester,
        type,
        description,
        fileUrl,
      } = req.body;


      if (
        !title ||
        !course ||
        !semester ||
        !type
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Title, course, semester and type are required.",
        });
      }


      if (
        type !== "Previous Question" &&
        type !== "Study Material"
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid resource type.",
        });
      }


      const resource = await Resource.create({
        title,
        course,
        semester,
        type,
        description: description || "",
        fileUrl: fileUrl || "",
        uploadedBy: req.user.userId,
      });


      const populatedResource =
        await Resource.findById(resource._id)
          .populate("uploadedBy", "name email");


      res.status(201).json({
        success: true,
        message: "Resource created successfully!",
        resource: populatedResource,
      });

    } catch (error) {

      console.error(
        "Create resource error:",
        error
      );

      res.status(500).json({
        success: false,
        message: "Failed to create resource.",
      });
    }
  }
);


// ========================================
// GET SINGLE RESOURCE
// ========================================

router.get("/:id", async (req, res) => {
  try {

    const resource =
      await Resource.findById(req.params.id)
        .populate("uploadedBy", "name email");


    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found.",
      });
    }


    res.json({
      success: true,
      resource,
    });

  } catch (error) {

    console.error(
      "Get resource error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to load resource.",
    });
  }
});


module.exports = router;