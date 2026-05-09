const express = require("express");
const {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom
} = require("../controllers/roomController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getRooms);
router.get("/:id", getRoomById);
router.post("/", protect, adminOnly, upload.single("image"), createRoom);
router.put("/:id", protect, adminOnly, upload.single("image"), updateRoom);
router.delete("/:id", protect, adminOnly, deleteRoom);

module.exports = router;
