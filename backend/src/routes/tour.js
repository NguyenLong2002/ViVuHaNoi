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
// update tour
router.put("/:id",upload.array('photos', 12), middlewareController.verifyAdmin, tourController.updateTour);
// delete tour
router.delete("/:id",middlewareController.verifyAdmin, tourController.hardDeleteTour);
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
router.get("/search/tourBySearch", tourController.getTourBySearch);
// get featured tour
router.get("/search/featuredTours", tourController.getFeaturedTours);
// get tour count
router.get("/search/tourCount", tourController.getTourCount);
// get tour by vehicle
router.get("/search/tourByVehicle", tourController.getTourByVehicle);

module.exports = router;