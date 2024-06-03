const router = require("express").Router();
const bookingController = require('../controllers/bookingController');
const middlewareController = require('../controllers/middlewareController')

router.post("/",middlewareController.verifyUser, bookingController.createBooking);
router.get("/:id",middlewareController.verifyUser, bookingController.getBooking);
router.get("/",middlewareController.verifyAdmin, bookingController.getAllBooking);

module.exports = router;