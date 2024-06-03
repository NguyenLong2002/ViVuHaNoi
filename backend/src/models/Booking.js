const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    fullName: {
      type: String,
      required: true,
    },
    tourName:{
        type: String,
      required: true,
    },
    adultSize: {
      type: Number,
      required: true,
    },
    childrenSize: {
      type: Number,
      required: true,
    },
    phone:{
        type:Number,
        required: true,
    },
    lookAt:{
        type:Date,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);