const express = require("express");
const { protect, adminOnly, studentOnly } = require("../middleware/authMiddleware");
const { requestBooking, getBookings, updateBooking, cancelBooking } = require("../controllers/bookingController");

const router = express.Router();

router.get("/", protect, getBookings);
router.post("/", protect, studentOnly, requestBooking);
router.put("/:id", protect, adminOnly, updateBooking);
router.delete("/:id", protect, studentOnly, cancelBooking);

module.exports = router;
