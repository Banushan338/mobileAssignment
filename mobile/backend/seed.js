const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./src/config/db");
const User = require("./src/models/User");
const Room = require("./src/models/Room");
const Booking = require("./src/models/Booking");

const seedTestData = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    // Find or create a test student
    let student = await User.findOne({ email: "student@test.com" });
    if (!student) {
      student = await User.create({
        name: "Test Student",
        email: "student@test.com",
        password: "password123",
        role: "student"
      });
      console.log("Created test student:", student.email);
    } else {
      console.log("Test student already exists:", student.email);
    }

    // Find a room
    let room = await Room.findOne();
    if (!room) {
      room = await Room.create({
        roomNumber: "101",
        roomType: "Single",
        capacity: 1,
        currentOccupancy: 0,
        pricePerMonth: 5000,
        availabilityStatus: "Available",
        image: null,
        description: "Test room for complaints"
      });
      console.log("Created test room:", room.roomNumber);
    } else {
      console.log("Using existing room:", room.roomNumber);
    }

    // Create an approved booking
    const existingBooking = await Booking.findOne({
      student: student._id,
      status: "Approved"
    });

    if (!existingBooking) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + 1);
      
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 30);

      const booking = await Booking.create({
        room: room._id,
        student: student._id,
        bookingDate: new Date(),
        startDate,
        endDate,
        status: "Approved",
        message: "Test booking for complaints",
        decisionBy: null,
        decidedAt: null
      });
      console.log("✅ Created approved booking:", booking._id);
      console.log("📅 Start date:", startDate.toISOString().split("T")[0]);
      console.log("📅 End date:", endDate.toISOString().split("T")[0]);
    } else {
      console.log("✅ Approved booking already exists");
    }

    console.log("\n✨ Test data setup complete!");
    console.log("You can now file complaints using this approved booking.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error.message);
    process.exit(1);
  }
};

seedTestData();
