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
  const Bookings = await Booking.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: Spot,
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
        ],
      },
    ],
  });
  for (let booking of Bookings) {
    const images = await SpotImage.findAll({
      where: { spotId: booking.spotId },
    });
    for (let image of images) {
      if (image) {
        if (image.preview === true) {
          booking.Spot.dataValues.previewImage = image.url;
        }
        if (image.preview === false) {
          booking.Spot.dataValues.previewImage = null;
        }
      }
    }
  }
  res.status(200);
  return res.json({ Bookings });
});

//Edit a booking
router.put("/:bookingId", restoreUser, requireAuth, async (req, res) => {
  const { startDate, endDate } = req.body;
  const booking = await Booking.findByPk(req.params.bookingId);

  if (!booking) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }
  const date1 = Date.parse(startDate);
  const date2 = Date.parse(endDate);
  if (date1 > date2) {
    res.status(400);
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot be on or before startDate",
      },
    });
  }
  if (date2 < Date.now()) {
    res.status(403);
    return res.json({
      message: "Past bookings can't be modified",
      statusCode: 403,
    });
  }
  if (booking.userId === req.user.id) {
    const oldBooking = await Booking.findOne({
      where: {
        startDate: startDate,
        endDate: endDate,
      },
    });
    if (oldBooking) {
      res.status(403);
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
    res.status(200);
    return res.json(booking);
  } else {
    res.status(403);
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

//Delete a booking
router.delete("/:bookingId", restoreUser, requireAuth, async (req, res) => {
  const booking = await Booking.findByPk(req.params.bookingId);

  if (!booking) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }
  const { startDate, endDate } = booking;
  const date1 = Date.parse(startDate);
  const date2 = Date.parse(endDate);
  if (date1 < Date.now()) {
    res.status(403);
    return res.json({
      message: "Past bookings can't be modified",
      statusCode: 403,
    });
  }
  const spot = await SpotImage.findAll();
  if (booking.userId === req.user.id && spot.ownerId === req.user.id) {
  }
  if (booking.userId === req.user.id) {
    await booking.destroy();
    res.status(200);
    return res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
});

module.exports = router;
