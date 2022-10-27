const e = require("express");
const express = require("express");
const router = express.Router();
const { Booking, User, Spot } = require("../../db/models");

//Get all of the Current User's Bookings*** requires Auth/start,end dates are null
router.get("/current", async (req, res) => {
  const bookings = await Booking.findByPk(req.user.id, {
    include: Spot,
  });

  return res.json(bookings);
});

//Edit a booking****requires Auth/ multiple errors
router.put("/:bookingId", async (req, res) => {
  const { startDate, endDate } = req.body;
  const booking = await Booking.findByPk(req.params.id);

  if (!booking) {
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404
    });
  }

  await booking.update({
    startDate: startDate,
    endDate: endDate,
  });
  return res.json(booking);
});

module.exports = router;
