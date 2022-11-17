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

  const Spots = await Spot.findAll();

  for (let spot of Spots) {
    let reviews = await Review.sum("stars", { where: { spotId: spot.id } });
    let count = await Review.count({ where: { spotId: spot.id } });
    let images = await SpotImage.findOne({ where: { spotId: spot.id } });

    let averageStars = reviews / count;
    spot.dataValues.avgRating = averageStars;

    if (images.preview === true) {
      spot.dataValues.previewImage = images.url;
    } else {
      spot.dataValues.previewImage = null;
    }
  }
  res.status(200);
  res.json({ Spots, page, size });
});

//Get all spots owned by the Current User
router.get("/current", restoreUser, async (req, res) => {
  const Spots = await Spot.findAll({ where: { ownerId: req.user.id } });

  for (let spot of Spots) {
    let reviews = await Review.sum("stars", { where: { spotId: spot.id } });
    let count = await Review.count({ where: { spotId: spot.id } });
    let image = await SpotImage.findOne({ where: { spotId: spot.id } });

    let averageStars = reviews / count;
    spot.dataValues.avgRating = averageStars;

    if (image) {
      if (image.preview === true) {
        spot.dataValues.previewImage = image.url;
      }
    }
    if (!image) {
      spot.dataValues.previewImage = null;
    }
  }

  res.status(200);
  return res.json({ Spots });
});

//Get details of a spot from an id
router.get("/:spotId", async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
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
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  if (!spot.address) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        address: "Street address is required",
      },
    });
  }
  if (!spot.city) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        city: "City is required",
      },
    });
  }
  if (!spot.state) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        state: "State is required",
      },
    });
  }
  if (!spot.country) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        country: "Country is required",
      },
    });
  }
  if (!spot.lat || spot.lat < -90 || spot.lat > 90) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        lat: "Latitude is not valid",
      },
    });
  }
  if (!spot.lng || spot.lng < -180 || spot.lng > 180) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        lng: "Longitude is not valid",
      },
    });
  }
  if (!spot.name || spot.name > 50) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        name: "Name must be less than 50 characters",
      },
    });
  }
  if (!spot.description) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        description: "Description is required",
      },
    });
  }
  if (!spot.price) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        price: "Price per day is required",
      },
    });
  }
  let reviews = await Review.sum("stars", {
    where: { spotId: req.params.spotId },
  });
  let count = await Review.count({ where: { spotId: req.params.spotId } });

  let averageStars = reviews / count;
  spot.dataValues.avgStarRating = averageStars;
  spot.dataValues.numReviews = count;

  res.status(200);
  return res.json(spot);
});

//Create a spot
router.post("/", restoreUser, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  if (!address) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        address: "Street address is required",
      },
    });
  }
  if (!city) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        city: "City is required",
      },
    });
  }
  if (!state) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        state: "State is required",
      },
    });
  }
  if (!country) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        country: "Country is required",
      },
    });
  }
  if (!lat || lat < -90 || lat > 90) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        lat: "Latitude is not valid",
      },
    });
  }
  if (!lng || lng < -180 || lng > 180) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        lng: "Longitude is not valid",
      },
    });
  }
  if (!name || name > 50) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        name: "Name must be less than 50 characters",
      },
    });
  }
  if (!description) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        description: "Description is required",
      },
    });
  }
  if (!price) {
    res.status(400);
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
  res.status(201);
  return res.json(newSpot);
});

//Add an image to a spot based on spotId
router.post("/:spotId/images", restoreUser, requireAuth, async (req, res) => {
  const { url, preview } = req.body;

  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    const statusCode = 404;
    res.status(statusCode);
    return res.json({
      message: "Spot couldn't be found",
      statusCode,
    });
  }
  if (spot.ownerId === req.user.id) {
    const newImage = await SpotImage.create({
      spotId: req.params.spotId,
      url: url,
      preview: preview,
    });
    res.status(200);
    return res.json(newImage.toSafeObject());
  } else {
    res.status(403);
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

//Edit a Spot
router.put("/:spotId", restoreUser, requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  if (!address) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        address: "Street address is required",
      },
    });
  }
  if (!city) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        city: "City is required",
      },
    });
  }
  if (!state) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        state: "State is required",
      },
    });
  }
  if (!country) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        country: "Country is required",
      },
    });
  }
  if (!lat || lat < -90 || lat > 90) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        lat: "Latitude is not valid",
      },
    });
  }
  if (!lng || lng < -180 || lng > 180) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        lng: "Longitude is not valid",
      },
    });
  }
  if (!name || name > 50) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        name: "Name must be less than 50 characters",
      },
    });
  }
  if (!description) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        description: "Description is required",
      },
    });
  }
  if (!price) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        price: "Price per day is required",
      },
    });
  }
  if (spot.ownerId === req.user.id) {
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
  } else {
    res.status(403);
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
  res.status(200);
  return res.json(spot);
});

//Delete a spot
router.delete("/:spotId", restoreUser, requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  if (spot.ownerId === req.user.id) {
    await spot.destroy();
    res.status(200);
    return res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  } else {
    res.status(403);
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

//Get all Reviews by a SpotId
router.get("/:spotId/reviews", async (req, res) => {
  const Reviews = await Review.findAll({
    where: { spotId: req.params.spotId },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });
  if (Reviews.length === 0) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  res.status(200);
  return res.json({ Reviews });
});

//Create a Review for a Spot based on the SpotId
router.post("/:spotId/reviews", restoreUser, async (req, res) => {
  const { review, stars } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  if (!review) {
    res.status(400);
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        review: "Review text is required",
      },
    });
  }
  if (!stars) {
    res.status(400);
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
    res.status(403);
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
  res.status(201);
  return res.json(newReview);
});

//Get all Bookings for a Spot based on the Spot's id
router.get("/:spotId/bookings", restoreUser, async (req, res) => {
  const spots = await Spot.findAll({ where: { id: req.params.spotId } });
  const Bookings = await Booking.findAll({
    where: { spotId: req.params.spotId },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });

  if (Bookings.length === 0) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  res.status(200);
  return res.json({ Bookings });
});

//Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings", restoreUser, requireAuth, async (req, res) => {
  const { startDate, endDate } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
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
  const oldBooking = await Booking.findOne({
    where: {
      userId: req.user.id,
      spotId: req.params.spotId,
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
  const newBooking = await Booking.create({
    userId: req.user.id,
    spotId: req.params.spotId,
    startDate: startDate,
    endDate: endDate,
  });
  res.status(200);
  return res.json(newBooking);
});

module.exports = router;
