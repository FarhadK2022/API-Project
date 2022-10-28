const express = require("express");
const router = express.Router();
const {
  Spot,
  SpotImage,
  Review,
  User,
  ReviewImage,
  Booking,
} = require("../../db/models");
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");

//Get all spots
router.get("/", async (req, res) => {
  const spots = await Spot.findAll();

  return res.json(spots);
});

//Get all spots owned by the Current User***needs aggregate
router.get("/current", restoreUser, async (req, res) => {
  const spots = await Spot.findByPk(req.user.id);

  return res.json(spots);
});

//Get details of a spot from an id*****needs aggregate
router.get("/:spotId", async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  return res.json(spot);
});

//Create a spot
router.post("/", restoreUser, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  if (!address) {
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        address: "Street address is required",
      },
    });
  }
  if (!city) {
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        city: "City is required",
      },
    });
  }
  if (!state) {
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        state: "State is required",
      },
    });
  }
  if (!country) {
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        country: "Country is required",
      },
    });
  }
  if (!lat || lat < -90 || lat > 90) {
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        lat: "Latitude is not valid",
      },
    });
  }
  if (!lng || lng < -180 || lng > 180) {
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        lng: "Longitude is not valid",
      },
    });
  }
  if (!name || name > 50) {
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        name: "Name must be less than 50 characters",
      },
    });
  }
  if (!description) {
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        description: "Description is required",
      },
    });
  }
  if (!price) {
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        price: "Price per day is required",
      },
    });
  }
  const newSpot = await Spot.create({
    ownerId: req.user.id,
    address: address,
    city: city,
    state: state,
    country: country,
    lat: lat,
    lng: lng,
    name: name,
    description: description,
    price: price,
  });
  return res.json(newSpot);
});

//Add an image to a spot based on spotId
router.post("/:spotId/images", restoreUser, requireAuth, async (req, res) => {
  const { url, preview } = req.body;

  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const newImage = await SpotImage.create({
    spotId: req.params.spotId,
    url: url,
    preview: preview,
  });
  return res.json(newImage.toSafeObject());
});

//Edit a Spot
router.put("/:spotId", restoreUser, requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  await spot.update({
    address: address,
    city: city,
    state: state,
    country: country,
    lat: lat,
    lng: lng,
    name: name,
    description: description,
    price: price,
  });
  return res.json(spot);
});

//Delete a spot
router.delete("/:spotId", restoreUser, requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  await spot.destroy();
  return res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

//Get all Reviews by a SpotId**** needs clean up on eager loading
router.get("/:spotId/reviews", async (req, res) => {
  const spot = await Review.findByPk(req.params.spotId, {
    include: [User, ReviewImage],
  });
  if (!spot) {
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  return res.json(spot);
});

//Create a Review for a Spot based on the SpotId
router.post("/:spotId/reviews", restoreUser, async (req, res) => {
  const { review, stars } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  if (!review) {
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        review: "Review text is required",
      },
    });
  }
  if (!stars) {
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        stars: "Stars must be an integer from 1 to 5",
      },
    });
  }
  const oldReview = Review.findOne({
    where: {
      userId: req.user.id,
      spotId: req.params.spotId,
    },
  });
  if (oldReview) {
    return res.json({
      message: "User already has a review for this spot",
      statusCode: 403,
    });
  }
  const newReview = await Review.create({
    userId: req.user.id,
    spotId: req.params.spotId,
    review: review,
    stars: stars,
  });
  return res.json(newReview);
});

//Get all Bookings for a Spot based on the Spot's id
router.get("/:spotId/bookings", restoreUser, async (req, res) => {
  const booking = await Booking.findByPk(req.params.spotId)
console.log(booking)
  if (!booking) {
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  return res.json(booking);
});

//Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings", restoreUser, requireAuth, async (req, res) => {
  const { startDate, endDate } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    return res.json({
      message: "Spot couldn't be found",
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
  const oldBooking = Booking.findOne({
    where: {
      spotId: req.params.spotId,
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
  const newBooking = await Booking.create({
    spotId: req.params.spotId,
    startDate: startDate,
    endDate: endDate,
  });
  return res.json(newBooking);
});


module.exports = router;
