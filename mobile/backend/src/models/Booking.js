const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookingDate: { type: Date, default: Date.now },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    message: { type: String, trim: true, default: "Room booking request" },
    decisionBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    decidedAt: { type: Date }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

bookingSchema.virtual("userId").get(function getUserId() {
  return this.student;
});

bookingSchema.virtual("roomId").get(function getRoomId() {
  return this.room;
});

module.exports = mongoose.model("Booking", bookingSchema);
