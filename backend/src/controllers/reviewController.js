const Review = require('../models/Review');
const Tour = require('../models/Tour');

const ReviewController = {
    //create review
    createReview: async (req, res) =>{
        const tourId = req.params.tourId;
        const newReview = new Review({...req.body});
        try{
            const saveReview = await newReview.save();

            await Tour.findByIdAndUpdate(tourId,{
                $push:{reviews: saveReview.id}
            });
            res.status(200).json({success:true, message:'Review submitted',data:saveReview});
        }catch(err){
        res.status(500).json({success:false, message:'failed to submit'});
        } 
},

};

module.exports = ReviewController;