const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    TourId: {
      type: mongoose.Types.ObjectId,
      ref: "Tour",
      required:true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);