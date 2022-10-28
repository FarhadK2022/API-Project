const express = require('express');
const router = express.Router();
const { SpotImage } = require('../../db/models');
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");

//Delete a SpotImage
router.delete("/:imageId", restoreUser, requireAuth, async (req, res) => {
  const image = await SpotImage.findByPk(req.params.imageId);
  if (!image) {
    return res.json({
      message: "Spot Image couldn't be found",
      statusCode: 404,
    });
  }
  await image.destroy();
  return res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
