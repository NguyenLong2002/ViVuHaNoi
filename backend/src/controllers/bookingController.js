const Booking = require('../models/Booking');
const bookingController = {
    //create booking
    createBooking: async (req,res) =>{
       const newBooking = new Booking(req.body);
       try{
           const saveBooking = await newBooking.save()
           res.status(200).json({success:true, message:'Your tour is booked',data:saveBooking})
       }catch(err){
           return res.status(500).json({success:true, message:'internal server error'})
       }
    },
    //get single booking
    getBooking: async(req,res) =>{
        const id = req.params.id;
        try{
            const book = await Booking.findById(id);
            res.status(200).json({success:true, message:'Successful',data:book})
        }catch(err){
            return res.status(404).json({success:true, message:'not found'})
        }
    },
    //get all booking
    getAllBooking: async(req,res) =>{
        try{
            const books = await Booking.find();
            res.status(200).json({success:true, message:'Successful',data:books})
        }catch(err){
            return res.status(404).json({success:true, message:'not found'})
        }
    },
};

module.exports = bookingController;