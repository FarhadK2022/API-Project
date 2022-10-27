const express = require("express");
const router = express.Router();
const { Spot } = require("../../db/models");
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

//********Get all spots owned by the Current User**************
router.get("/current",  async (req, res) => {
    const spots = await Spot.findByPk(req.user.id);

    return res.json(spots);
  }
);

//Get details of a spot from an id
router.get('/:spotId', async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId)
  if(!spot){
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }
  return res.json(spot)
})

//Create a spot
router.post('/', async (req, res) => {
  const {address, city, state, country, lat, lng, name, description, price} = req.body
  
  const newSpot = await Spot.create({
    ownerId: req.user.id,
    address: address,
    city: city,
    state: state,
    country: country,
    lat: lat,
    lng:lng,
    name: name,
    description: description,
    price: price
  })
  return res.json(newSpot)
})

module.exports = router;
