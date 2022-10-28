const express = require("express");
const router = express.Router();

const { Review, ReviewImage } = require("../../db/models");
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");

//Get all Reviews of the Current User***** needs aggragate
router.get("/current", restoreUser, async (req, res) => {
  const reviews = await Review.findByPk(req.user.id);

  return res.json(reviews);
});

//Add an Image to a Review based on the Review's id
router.post("/:reviewId/images", restoreUser, requireAuth, async (req, res) => {
  const { url } = req.body;
  const review = await Review.findByPk(req.params.reviewId);

  if (!review) {
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }
  const newImage = await ReviewImage.create({
    reviewId: req.params.reviewId,
    url: url
  })
  return res.json(newImage.toSafeObject())
});

//Edit a Review
router.put('/:reviewId', restoreUser, requireAuth, async (req, res) => {
  const { review, stars } = req.body
  const rev = await Review.findByPk(req.params.reviewId)

  if (!rev) {
    return res.json({
      message: "Review couldn't be found",
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
  await rev.update({
    review: review,
    stars: stars
  })
  return res.json(rev)
})

//Delete a Review
router.delete('/:reviewId', restoreUser, requireAuth, async(req, res) => {
  const review = await Review.findByPk(req.params.reviewId)
  if (!review) {
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }
  await review.destroy()
  return res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
})
module.exports = router;
