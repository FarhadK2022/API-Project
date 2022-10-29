const express = require("express");
const router = express.Router();
const {
  Spot,
  SpotImage,
  Review,
  User,
  ReviewImage,
  Booking,
  sequelize,
} = require("../../db/models");
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");

//Get all spots
router.get("/", async (req, res) => {
  let { page, size } = req.query;

  page = parseInt(page);
  size = parseInt(size);

  if (Number.isNaN(page)) page = 1;
  if (Number.isNaN(size)) size = 20;

  const spots = await Spot.findAll({
    attributes: {
      include: [
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
        [sequelize.col("SpotImages.url"), "previewImage"],
      ],
    },
    include: [
      {
        model: Review,
        attributes: [],
      },
      { model: SpotImage, attributes: [] },
    ],
  });

  // let spotsList = [];
  // for (let i = 0; i < spots.length; i++) {
  //   spotsList.push(spots[i]);
  // }

  // for (let i = 0; i < spotsList.length; i++) {
  //   for (let j = 0; j < SpotImage.length; j++) {
  //     if (SpotImage.preview === true) {
  //       spots.previewImage = SpotImage.url;
  //     }
  //   }
  // }
  res.status(200)
  return res.json({ spots, page, size });
});

//Get all spots owned by the Current User
router.get("/current", restoreUser, async (req, res) => {
  const spots = await Spot.findByPk(req.user.id, {
    attributes: {
      include: [
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
        [sequelize.col("SpotImages.url"), "previewImage"],
      ],
    },
    include: [
      {
        model: Review,
        attributes: [],
      },
      { model: SpotImage, attributes: [] },
    ],
  });
  res.status(200)
  return res.json(spots);
});

//Get details of a spot from an id
router.get("/:spotId", async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    attributes: {
      include: [
        // [sequelize.fn("COUNT", sequelize.col("Reviews.review")), "numReviews"],
        // [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"],

        // [sequelize.col("SpotImages.url"), 'previewImage'],
      ],
    },
    include: [
      {
        model: Review,
        attributes: [],
      },
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });


  if (!spot) {
    res.status(404)
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  res.status(200)
  return res.json(spot);
});

//Create a spot
router.post("/", restoreUser, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  if (!address) {
    res.status(400)
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        address: "Street address is required",
      },
    });
  }
  if (!city) {
    res.status(400)
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        city: "City is required",
      },
    });
  }
  if (!state) {
    res.status(400)
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        state: "State is required",
      },
    });
  }
  if (!country) {
    res.status(400)
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        country: "Country is required",
      },
    });
  }
  if (!lat || lat < -90 || lat > 90) {
    res.status(400)
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        lat: "Latitude is not valid",
      },
    });
  }
  if (!lng || lng < -180 || lng > 180) {
    res.status(400)
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        lng: "Longitude is not valid",
      },
    });
  }
  if (!name || name > 50) {
    res.status(400)
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        name: "Name must be less than 50 characters",
      },
    });
  }
  if (!description) {
    res.status(400)
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        description: "Description is required",
      },
    });
  }
  if (!price) {
    res.status(400)
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
  res.status(201)
  return res.json(newSpot);
});

//Add an image to a spot based on spotId
router.post("/:spotId/images", restoreUser, requireAuth, async (req, res) => {
  const { url, preview } = req.body;

  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    res.status(400)
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
  res.status(200)
  return res.json(newImage.toSafeObject());
});

//Edit a Spot
router.put("/:spotId", restoreUser, requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    res.status(404)
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  if (!address) {
    res.status(400)
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        address: "Street address is required",
      },
    });
  }
  if (!city) {
    res.status(400)
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        city: "City is required",
      },
    });
  }
  if (!state) {
    res.status(400)
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        state: "State is required",
      },
    });
  }
  if (!country) {
    res.status(400)
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        country: "Country is required",
      },
    });
  }
  if (!lat || lat < -90 || lat > 90) {
    res.status(400)
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        lat: "Latitude is not valid",
      },
    });
  }
  if (!lng || lng < -180 || lng > 180) {
    res.status(400)
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        lng: "Longitude is not valid",
      },
    });
  }
  if (!name || name > 50) {
    res.status(400)
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        name: "Name must be less than 50 characters",
      },
    });
  }
  if (!description) {
    res.status(400)
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        description: "Description is required",
      },
    });
  }
  if (!price) {
    res.status(400)
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        price: "Price per day is required",
      },
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
  res.status(200)
  return res.json(spot);
});

//Delete a spot
router.delete("/:spotId", restoreUser, requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    res.status(404)
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  await spot.destroy();
  res.status(200)
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
    res.status(404)
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  res.status(200)
  return res.json(spot);
});

//Create a Review for a Spot based on the SpotId
router.post("/:spotId/reviews", restoreUser, async (req, res) => {
  const { review, stars } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404)
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  if (!review) {
    res.status(400)
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        review: "Review text is required",
      },
    });
  }
  if (!stars) {
    res.status(400)
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        stars: "Stars must be an integer from 1 to 5",
      },
    });
  }
  const oldReview = await Review.findOne({
    where: {
      userId: req.user.id,
      spotId: req.params.spotId,
    },
  });
  if (oldReview) {
    res.status(403)
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
  res.status(201)
  return res.json(newReview);
});

//Get all Bookings for a Spot based on the Spot's id
router.get("/:spotId/bookings", restoreUser, async (req, res) => {
  const booking = await Booking.findByPk(req.params.spotId, {
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  }
    );
  // console.log(booking);
  if (!booking) {
    res.status(404)
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  res.status(200)
  return res.json(booking);
});

//Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings", restoreUser, requireAuth, async (req, res) => {
  const { startDate, endDate } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404)
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  const date1 = Date.parse(startDate);
  const date2 = Date.parse(endDate);
  if (date1 > date2) {
    res.status(400)
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot be on or before startDate",
      },
    });
  }
  const oldBooking = await Booking.findOne({
    where: {
      userId: req.user.id,
      spotId: req.params.spotId,
      startDate: startDate,
      endDate: endDate,
    },
  });
  if (oldBooking) {
    res.status(403)
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
    userId: req.user.id,
    spotId: req.params.spotId,
    startDate: startDate,
    endDate: endDate,
  });
  res.status(200)
  return res.json(newBooking);
});

module.exports = router;
