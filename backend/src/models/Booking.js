const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    tourDetails: {
      type: mongoose.Types.ObjectId,
      ref: "Tour",
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone:{
        type:Number,
        required: true,
    },
    hotelAddress:{
      type: String,
      required:true,
    },
    timeStart:{
      type:Number,
      required:true,
    },
    userRequest:{
      type:String,
    },
    status: {
      type: String,
      default: "Booked",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);