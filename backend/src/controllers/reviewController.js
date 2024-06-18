const Review = require('../models/Review');
const Tour = require('../models/Tour');

const ReviewController = {
    //create review
    createReview: async (req, res) =>{
        const tourId = req.params.tourId;
        const newReview = new Review({...req.body, TourId:tourId});
        try{
            // Kiểm tra tourId tồn tại hay không
            const tour = await Tour.findById(tourId);
            if (!tour) {
                return res.status(404).json({ success: false, message: 'Tour not found' });
            }

            const saveReview = await newReview.save();

            await Tour.findByIdAndUpdate(tourId,{
                $push:{reviews: saveReview.id}
            });
            res.status(200).json({success:true, message:'Review submitted',data:saveReview});
        }catch(err){
        res.status(500).json({success:false, message:'failed to submit'});
        } 
    },

    //get all reviews
    getAllReviews: async (req, res) => {
        try{
            const reviews = await Review.find();
            res.status(200).json(reviews)
        }catch(err){
            res.status(500).json(err)
        }
    }

};

module.exports = ReviewController;