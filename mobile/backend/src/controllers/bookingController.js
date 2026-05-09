const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Room = require("../models/Room");

const requestBooking = async (req, res) => {
  try {
    const currentUserId = req.user?.userId || req.user?.id;
    const { roomId, startDate, endDate, message } = req.body;
    if (!currentUserId) {
      return res.status(401).json({ message: "Invalid user token." });
    }
    if (!mongoose.Types.ObjectId.isValid(currentUserId)) {
      return res.status(401).json({ message: "Invalid user identity." });
    }
    if (!roomId) {
      return res.status(400).json({ message: "Room ID is required." });
    }
    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({ message: "Invalid room ID." });
    }
    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Start date and end date are required." });
    }
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    if (Number.isNaN(parsedStartDate.getTime()) || Number.isNaN(parsedEndDate.getTime())) {
      return res.status(400).json({ message: "Invalid start/end date format. Use YYYY-MM-DD." });
    }
    if (parsedEndDate <= parsedStartDate) {
      return res.status(400).json({ message: "End date must be after start date." });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found." });
    }

    if (room.availabilityStatus !== "Available") {
      return res.status(400).json({ message: "Room is not available for booking." });
    }

    const existing = await Booking.findOne({ room: roomId, student: currentUserId, status: "Pending" });
    if (existing) {
      return res.status(400).json({ message: "You already have a pending booking request for this room." });
    }

    const booking = await Booking.create({
      room: roomId,
      student: currentUserId,
      bookingDate: new Date(),
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      message: message || "Room booking request"
    });

    return res.status(201).json(booking);
  } catch (error) {
    console.error("Booking request error:", error);
    return res.status(500).json({ message: "Failed to request booking", error: error.message });
  }
};

const getBookings = async (req, res) => {
  try {
    const currentUserId = req.user?.userId || req.user?.id;
    const currentUserRole = String(req.user?.role || "").toLowerCase();
    const query = currentUserRole === "admin" ? {} : { student: currentUserId };
    const bookings = await Booking.find(query)
      .populate("room")
      .populate("student", "name email role")
      .sort({ createdAt: -1 });
    return res.json(bookings);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
  }
};

const updateBooking = async (req, res) => {
  try {
    const currentUserId = req.user?.userId || req.user?.id;
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id).populate("room");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    if (booking.status !== "Pending") {
      return res.status(400).json({ message: "Only pending bookings can be updated." });
    }

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status update." });
    }

    if (status === "Approved") {
      const room = await Room.findById(booking.room._id);
      if (!room) {
        return res.status(404).json({ message: "Room not found." });
      }
      if (room.currentOccupancy >= room.capacity) {
        return res.status(400).json({ message: "Room is already full." });
      }
      room.currentOccupancy += 1;
      room.availabilityStatus = room.currentOccupancy >= room.capacity ? "Full" : "Available";
      await room.save();
    }

    booking.status = status;
    booking.decisionBy = currentUserId;
    booking.decidedAt = new Date();
    await booking.save();

    return res.json(booking);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update booking", error: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const currentUserId = req.user?.userId || req.user?.id;
    const booking = await Booking.findById(req.params.id).populate("room");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }
    if (String(booking.student) !== String(currentUserId)) {
      return res.status(403).json({ message: "You can only cancel your own bookings." });
    }
    if (!["Pending", "Approved"].includes(booking.status)) {
      return res.status(400).json({ message: "Only pending or approved bookings can be cancelled." });
    }

    if (booking.status === "Approved") {
      const room = await Room.findById(booking.room?._id || booking.room);
      if (room) {
        room.currentOccupancy = Math.max(0, room.currentOccupancy - 1);
        room.availabilityStatus = room.currentOccupancy >= room.capacity ? "Full" : "Available";
        await room.save();
      }
    }

    await booking.deleteOne();
    return res.json({ message: "Booking cancelled successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to cancel booking", error: error.message });
  }
};

module.exports = { requestBooking, getBookings, updateBooking, cancelBooking };
