const Tour = require("../models/Tour");

const tourController = {
    //createTour
    createTour: async (req, res) => {
        try {
            const photos = req.files.map(file => `/images/tour/${file.filename}`);
            const newTour = new Tour({
                ...req.body,
                photos
            });
            const savedTour = await newTour.save();
            res.status(200).json({ success: true, message: 'Successfully created', data: savedTour });
        } catch (err) {
            console.error('Error creating tour:', err);  // Log the detailed error
            res.status(500).json({ success: false, message: 'Failed to create. Try again', error: err.message });
        }
    },
    //updateTour
    updateTour:async(req, res)=>{
        const id = req.params.id;
        try{
            const updatedTour = await Tour.findByIdAndUpdate(id,{
                $set : req.body
            },{new:true});
            res.status(200).json({success:true,message:"Successfully updated", data:updatedTour,});
        }catch(err){
            res.status(500).json({success:false,message:"Failed to update. Try again",})
        }
    },
    // Soft delete tour
    softDeleteTour: async (req, res) => {
        const id = req.params.id;
        try {
        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set: { isDeleted: true }
        }, { new: true });
        res.status(200).json({ success: true, message: "Successfully soft deleted", data: updatedTour });
        } catch (err) {
        res.status(500).json({ success: false, message: "Failed to soft delete. Try again" });
        }
    },
    //deleteTour
    deleteTour:async(req, res)=>{
        const id = req.params.id;
        try{
            await Tour.findByIdAndDelete(id);
            res.status(200).json({success:true,message:"Successfully deleted"});
        }catch(err){
            res.status(500).json({success:false,message:"Failed to delete. Try again",})
        }
    },
    // Restore tour
    restoreTour: async (req, res) => {
        const id = req.params.id;
        try {
        const restoredTour = await Tour.findByIdAndUpdate(id, {
            $set: { isDeleted: false }
        }, { new: true });
        res.status(200).json({ success: true, message: "Successfully restored", data: restoredTour });
        } catch (err) {
        res.status(500).json({ success: false, message: "Failed to restore. Try again" });
        }
    },
    // Get deleted tours
    getDeletedTours: async (req, res) => {
        try {
        const tours = await Tour.find({ isDeleted: true });
        res.status(200).json({ success: true, data: tours });
        } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch deleted tours. Try again" });
        }
    },
    //getSingleTour
    getSingleTour:async(req, res)=>{
        const id = req.params.id;
        try{
            const tour = await Tour.findById(id).populate("reviews");
            res.status(200).json({success:true,message:"Successful ",data:tour});
        }catch(err){
            res.status(404).json({success:false,message:"Not found",})
        }
    },
    //getAllTour
    getAllTour:async(req, res)=>{

        //for pagination
        const page = parseInt(req.query.page);
        try{
            const tours = await Tour.find({isDeleted:false}).populate("reviews").skip(page * 6).limit(6);
            res.status(200).json({success:true,message:"Successful ",count:tours.length, data:tours});
        }catch(err){
            res.status(404).json({success:false,message:"Not found",})
        }
    },

    //get tour by search
    getTourBySearch: async(req, res)=>{

        //'i' means case sensitive
        const address = new RegExp(req.query.address, 'i');
        const maxGroupSize = req.query.maxGroupSize;
        const price = req.query.priceForAdults;

        try{
            //gte means greater than equal
            const tours = await Tour.find({
                address,
                maxGroupSize:{$gte:maxGroupSize},
                price:{$gte:price}
            }).populate("reviews")
            res.status(200).json({
                success:true,
                message:"Successful ",
                data:tours});
        }catch(err){
            res.status(404).json({success:false,message:"Not found",})
        }
    },
    //get featured tours
    getFeaturedTours:async(req, res)=>{
        try{
            const tours = await Tour.find({featured:true,isDeleted:false}).populate("reviews").limit(6);
            res.status(200).json({success:true,message:"Successful ",count:tours.length, data:tours});
        }catch(err){
            res.status(404).json({success:false,message:"Not found",})
        }
    },
    //get tours cound
    getTourCount:async(req, res)=>{
        try{
            const tourCount = await Tour.estimatedDocumentCount();
            res.status(200).json({success:true,data:tourCount});
        }catch(err){
            res.status(500).json({success:false,message:"failed to fetch",})
        }
    },
    //get Search tours by vehicle
    getTourByVehicle:async(req, res)=>{
        const vehicle = new RegExp(req.query.vehicle, 'i');
        try{
            const tours = await Tour.find({vehicle,
            })
            res.status(200).json({success:true,count:tours.length,data:tours});
        }catch(err){
            res.status(404).json({success:false,message:"not found",})
        }
    },
    
};

module.exports = tourController;