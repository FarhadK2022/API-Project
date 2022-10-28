const express = require("express");
const router = express.Router();
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { Booking, User, Spot, SpotImage } = require("../../db/models");

//Get all of the Current User's Bookings
router.get("/current", restoreUser, async (req, res) => {
  const bookings = await Booking.findAll({
    where: {
      userId: req.user.id,
    },
    include: Spot,
  });

  return res.json(bookings);
});

//Edit a booking
router.put("/:bookingId", restoreUser, requireAuth, async (req, res) => {
  const { startDate, endDate } = req.body;
  const booking = await Booking.findByPk(req.params.bookingId);

  if (!booking) {
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }
  const date1 = Date.parse(startDate);
  const date2 = Date.parse(endDate);
  if (date1 > date2) {
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot be on or before startDate",
      },
    });
  }
  if (date2 < Date.now()) {
    return res.json({
      message: "Past bookings can't be modified",
      statusCode: 403,
    });
  }
  const oldBooking = await Booking.findOne({
    where: {
      startDate: startDate,
      endDate: endDate,
    },
  });
  if (oldBooking) {
    return res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: 403,
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking",
      },
    });
  }

  await booking.update({
    startDate: startDate,
    endDate: endDate,
  });
  return res.json(booking);
});

//Delete a booking
router.delete("/:bookingId", restoreUser, requireAuth, async (req, res) => {
  const booking = await Booking.findByPk(req.params.bookingId);

  if (!booking) {
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }
  const { startDate, endDate } = booking;
  const date1 = Date.parse(startDate);
  const date2 = Date.parse(endDate);
  if (date1 < Date.now()) {
    return res.json({
      message: "Past bookings can't be modified",
      statusCode: 403,
    });
  }
  await booking.destroy();
  return res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
