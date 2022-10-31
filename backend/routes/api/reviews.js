const express = require("express");
const router = express.Router();

const {
  Review,
  ReviewImage,
  User,
  Spot,
  SpotImage,
} = require("../../db/models");
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");

//Get all Reviews of the Current User
router.get("/current", restoreUser, async (req, res) => {
  const Reviews = await Review.findAll({
    where: { userId: req.user.id },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
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
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  for (let review of Reviews) {
    const images = await SpotImage.findAll({
      where: { spotId: review.spotId },
    });
    for (let image of images) {
      if (!image) {
        review.Spot.dataValues.previewImage = null;
      }
      if (image.preview === true) {
        review.Spot.dataValues.previewImage = image.url;
      }
    }
  }

  res.status(200);
  return res.json({ Reviews });
});

//Add an Image to a Review based on the Review's id
router.post("/:reviewId/images", restoreUser, requireAuth, async (req, res) => {
  const { url } = req.body;
  const review = await Review.findByPk(req.params.reviewId);

  if (!review) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }
  if (review.userId === req.user.id) {
    const newImage = await ReviewImage.create({
      reviewId: req.params.reviewId,
      url: url,
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

//Edit a Review
router.put("/:reviewId", restoreUser, requireAuth, async (req, res) => {
  const { review, stars } = req.body;
  const rev = await Review.findByPk(req.params.reviewId);

  if (!rev) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
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
  if (rev.userId === req.user.id) {
    await rev.update({
      review: review,
      stars: stars,
    });
    res.status(200);
    return res.json(rev);
  } else {
    res.status(403);
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

//Delete a Review
router.delete("/:reviewId", restoreUser, requireAuth, async (req, res) => {
  const review = await Review.findByPk(req.params.reviewId);
  if (!review) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }
  if (review.userId === req.user.id) {
    await review.destroy();
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
module.exports = router;
