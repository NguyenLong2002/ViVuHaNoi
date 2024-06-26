const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required:true,
            unique:true,
        },
        city:{
            type:String,
            required:true,
        },
        tourTime :{
            type:Number,
            required:true,
        },
        desc:{
            type:String,
            required:true,
         },
        destinations:[{ 
            type: String, 
            required: true 
        }],
        executiveOffice:{
            type: String
        },
        pickupLocation:{
            type: String
        },
        photos:[{ 
            type: String, 
            required: true 
        }],
         priceForAdults:{
             type:Number,
             required:true,
         },
        priceForChildren:{
            type:Number,
            required:true,
        },
        maxGroupSize: {
             type: Number,
             required: true,
         },
        vehicle:{
            type:String,
            required:true,
        },
        reviews: [
            {
              type: mongoose.Types.ObjectId,
              ref: "Review",
            },
          ],
        featured: {
            type: Boolean,
            default: false,
          },
        isDeleted: {
            type: Boolean,
            default:false,
        }
    },
    {
        timestamps:true,
        versionKey:false,
    }
);
module.exports =  mongoose.model("Tour",tourSchema);