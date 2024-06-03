const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tourController");
const middlewareController = require("../controllers/middlewareController");

// Create new tour
router.post("/",middlewareController.verifyAdmin, tourController.createTour);
// update new tour
router.put("/:id",middlewareController.verifyAdmin, tourController.updateTour);
// delete new tour
router.delete("/:id",middlewareController.verifyAdmin, tourController.deleteTour);

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