const fs = require("fs");
const path = require("path");
const Room = require("../models/Room");

const normalizeAvailability = (room) => {
  if (room.availabilityStatus === "Maintenance") return "Maintenance";
  return room.currentOccupancy >= room.capacity ? "Full" : "Available";
};

const createRoom = async (req, res) => {
  try {
    const payload = { ...req.body };

    // Handle base64 image
    if (payload.image && payload.image.startsWith("data:image")) {
      const base64Data = payload.image.split(",")[1];
      const imageName = payload.imageName || `image-${Date.now()}.jpg`;
      const imagePath = path.join("uploads", imageName);

      fs.writeFileSync(imagePath, base64Data, "base64");
      payload.image = `${req.protocol}://${req.get("host")}/uploads/${imageName}`;
      delete payload.imageName;
    } else if (req.file) {
      // Fallback to multer file
      payload.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    if (Number(payload.currentOccupancy) > Number(payload.capacity)) {
      return res.status(400).json({ message: "Current occupancy cannot exceed capacity." });
    }

    payload.availabilityStatus = normalizeAvailability(payload);
    const room = await Room.create(payload);
    return res.status(201).json(room);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create room", error: error.message });
  }
};

const getRooms = async (_req, res) => {
  try {
    console.log("Fetching rooms...");
    const rooms = await Room.find().sort({ createdAt: -1 });
    console.log(`Found ${rooms.length} rooms`);

    // Convert to plain objects to avoid serialization issues
    const plainRooms = rooms.map(room => room.toObject());
    console.log("Converted to plain objects");

    return res.json(plainRooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return res.status(500).json({ message: "Failed to fetch rooms", error: error.message });
  }
};

const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    return res.json(room);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch room", error: error.message });
  }
};

const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    Object.assign(room, req.body);

    // Handle base64 image
    if (room.image && room.image.startsWith("data:image")) {
      const base64Data = room.image.split(",")[1];
      const imageName = req.body.imageName || `image-${Date.now()}.jpg`;
      const imagePath = path.join("uploads", imageName);

      fs.writeFileSync(imagePath, base64Data, "base64");
      room.image = `${req.protocol}://${req.get("host")}/uploads/${imageName}`;
      delete room.imageName;
    } else if (req.file) {
      // Fallback to multer file
      room.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    if (room.currentOccupancy > room.capacity) {
      return res.status(400).json({ message: "Current occupancy cannot exceed capacity." });
    }

    room.availabilityStatus = normalizeAvailability(room);
    await room.save();
    return res.json(room);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update room", error: error.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    await room.deleteOne();
    return res.json({ message: "Room deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete room", error: error.message });
  }
};

module.exports = { createRoom, getRooms, getRoomById, updateRoom, deleteRoom };
