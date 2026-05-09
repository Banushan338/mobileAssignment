const express = require("express");
const { protect, adminOnly, studentOnly } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint
} = require("../controllers/complaintController");

const router = express.Router();

router.get("/", protect, getComplaints);
router.get("/:id", protect, getComplaintById);
router.post("/", protect, studentOnly, upload.single("image"), createComplaint);
router.put("/:id", protect, updateComplaint);
router.delete("/:id", protect, studentOnly, deleteComplaint);

module.exports = router;
