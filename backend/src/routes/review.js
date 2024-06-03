const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const middlewareController = require('../controllers/middlewareController')

router.post("/:tourId",middlewareController.verifyUser, reviewController.createReview);
module.exports = router;
