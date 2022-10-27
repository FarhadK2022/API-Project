const express = require("express");
const router = express.Router();
const { Spot, SpotImage } = require("../../db/models");
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

//********Get all spots owned by the Current User***needs aggregate
router.get("/current", async (req, res) => {
  const spots = await Spot.findByPk(req.user.id);

  return res.json(spots);
});

//******Get details of a spot from an id*****needs aggregate
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

//******Create a spot******auth needed, error needed
router.post("/", async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

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

//****Add an image to a spot based on spotId**** auth needed, error needed
router.post("/:spotId/images", async (req, res) => {
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

//****Edit a Spot**** auth needed
router.put("/:spotId", async (req, res) => {
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

//Delete a spot*****auth needed
router.delete("/:spotId", async (req, res) => {
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

module.exports = router;
