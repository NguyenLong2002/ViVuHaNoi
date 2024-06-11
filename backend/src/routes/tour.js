const express = require("express");
const multer = require('multer');
const router = express.Router();
const tourController = require("../controllers/tourController");
const middlewareController = require("../controllers/middlewareController");
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../assets/images/tour/'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Create new tour
router.post("/",upload.array('photos', 12),middlewareController.verifyAdmin, tourController.createTour);
// update new tour
router.put("/:id",middlewareController.verifyAdmin, tourController.updateTour);
// delete new tour
router.delete("/:id",middlewareController.verifyAdmin, tourController.deleteTour);
// soft delete tour
router.put('/soft-delete/:id',middlewareController.verifyAdmin, tourController.softDeleteTour); 
// get deleted tours
router.get('/trash',middlewareController.verifyAdmin,tourController.getDeletedTours); 
// restore deleted tour
router.put('/restore/:id',middlewareController.verifyAdmin,tourController.restoreTour); 

// get single tour
router.get("/:id", tourController.getSingleTour);
// get all tour
router.get("/", tourController.getAllTour);
// get tour by search
router.get("/search/getTourBySearch", tourController.getTourBySearch);
// get featured tour
router.get("/search/getFeaturedTours", tourController.getFeaturedTours);
// get tour count
router.get("/search/getTourCount", tourController.getTourCount);
// get tour by vehicle
router.get("/search/getTourByVehicle", tourController.getTourByVehicle);

module.exports = router;