const express = require("express");
const authRouter = require('./auth');
const userRouter = require('./user');
const tourRouter = require('./tour');
const reviewRouter = require('./review');
const bookingRouter = require('./booking');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/tour', tourRouter);
router.use('/review', reviewRouter);
router.use('/booking', bookingRouter);

module.exports = router;