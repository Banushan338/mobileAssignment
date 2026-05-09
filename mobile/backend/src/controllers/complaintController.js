const mongoose = require("mongoose");
const Complaint = require("../models/Complaint");
const Booking = require("../models/Booking");
const Room = require("../models/Room");

const createComplaint = async (req, res) => {
  try {
    const currentUserId = req.user?.userId || req.user?.id;
    const { bookingId, title, description, category, priority } = req.body;

    if (!currentUserId) {
      return res.status(401).json({ message: "Invalid user token." });
    }

    if (!bookingId || !title || !description) {
      return res.status(400).json({ message: "Booking ID, title, and description are required." });
    }

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: "Invalid booking ID." });
    }

    const booking = await Booking.findById(bookingId).populate("room");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    if (booking.student.toString() !== currentUserId.toString()) {
      return res.status(403).json({ message: "You can only file complaints for your own bookings." });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const complaint = await Complaint.create({
      booking: bookingId,
      student: currentUserId,
      room: booking.room._id,
      title,
      description,
      category: category || "Other",
      priority: priority || "Medium",
      image: imageUrl
    });

    const populatedComplaint = await complaint.populate([
      { path: "student", select: "name email" },
      { path: "room", select: "roomNumber roomType" },
      { path: "booking" }
    ]);

    return res.status(201).json(populatedComplaint);
  } catch (error) {
    console.error("Create complaint error:", error);
    return res.status(500).json({ message: "Failed to create complaint", error: error.message });
  }
};

const getComplaints = async (req, res) => {
  try {
    const currentUserId = req.user?.userId || req.user?.id;
    const currentUserRole = String(req.user?.role || "").toLowerCase();
    
    let query = currentUserRole === "admin" ? {} : { student: currentUserId };
    
    const complaints = await Complaint.find(query)
      .populate("student", "name email")
      .populate("room", "roomNumber roomType")
      .populate("booking")
      .populate("respondedBy", "name")
      .sort({ createdAt: -1 });

    return res.json(complaints);
  } catch (error) {
    console.error("Get complaints error:", error);
    return res.status(500).json({ message: "Failed to fetch complaints", error: error.message });
  }
};

const getComplaintById = async (req, res) => {
  try {
    const currentUserId = req.user?.userId || req.user?.id;
    const complaint = await Complaint.findById(req.params.id)
      .populate("student", "name email")
      .populate("room", "roomNumber roomType")
      .populate("booking")
      .populate("respondedBy", "name");

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    const currentUserRole = String(req.user?.role || "").toLowerCase();
    if (currentUserRole === "student" && complaint.student.toString() !== currentUserId.toString()) {
      return res.status(403).json({ message: "You can only view your own complaints." });
    }

    return res.json(complaint);
  } catch (error) {
    console.error("Get complaint by ID error:", error);
    return res.status(500).json({ message: "Failed to fetch complaint", error: error.message });
  }
};

const updateComplaint = async (req, res) => {
  try {
    const currentUserId = req.user?.userId || req.user?.id;
    const currentUserRole = String(req.user?.role || "").toLowerCase();
    const { status, response, priority } = req.body;

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    if (currentUserRole === "student") {
      if (complaint.student.toString() !== currentUserId.toString()) {
        return res.status(403).json({ message: "You can only update your own complaints." });
      }
      if (priority) complaint.priority = priority;
    } else if (currentUserRole === "admin") {
      if (status && ["Open", "In Progress", "Resolved", "Closed"].includes(status)) {
        complaint.status = status;
      }
      if (response) {
        complaint.response = response;
        complaint.respondedBy = currentUserId;
        complaint.respondedAt = new Date();
      }
      if (priority) complaint.priority = priority;
    }

    const updatedComplaint = await complaint.save();
    const populatedComplaint = await updatedComplaint.populate([
      { path: "student", select: "name email" },
      { path: "room", select: "roomNumber roomType" },
      { path: "booking" },
      { path: "respondedBy", select: "name" }
    ]);

    return res.json(populatedComplaint);
  } catch (error) {
    console.error("Update complaint error:", error);
    return res.status(500).json({ message: "Failed to update complaint", error: error.message });
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const currentUserId = req.user?.userId || req.user?.id;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    if (complaint.student.toString() !== currentUserId.toString()) {
      return res.status(403).json({ message: "You can only delete your own complaints." });
    }

    if (complaint.status !== "Open") {
      return res.status(400).json({ message: "You can only delete complaints with 'Open' status." });
    }

    await Complaint.findByIdAndDelete(req.params.id);
    return res.json({ message: "Complaint deleted successfully." });
  } catch (error) {
    console.error("Delete complaint error:", error);
    return res.status(500).json({ message: "Failed to delete complaint", error: error.message });
  }
};

module.exports = {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint
};
