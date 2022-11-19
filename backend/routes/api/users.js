const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const db = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide first name"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide last name"),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

//Sign up a User
router.post(
  "/",
validateSignup,
  async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    const first = await User.findOne({
      where: { email: email },
    });
    if (first) {
      res.status(403);
      return res.json({
        message: "User already exists",
        statusCode: 403,
        errors: {
          email: "User with that email already exists",
        },
      });
    }
    const second = await User.findOne({
      where: { username: username },
    });
    if (second) {
      res.status(403);
      return res.json({
        message: "User already exists",
        statusCode: 403,
        errors: {
          email: "User with that username already exists",
        },
      });
    }
    if (!email) {
      res.status(400);
      return res.json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          email: "Invalid email",
        },
      });
    }
    if (!username) {
      res.status(400);
      return res.json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          email: "Username is required",
        },
      });
    }
    if (!firstName) {
      res.status(400);
      return res.json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          email: "First name is required",
        },
      });
    }
    if (!lastName) {
      res.status(400);
      return res.json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          email: "Last name is required",
        },
      });
    }
    const user = await User.signup({
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password,
    });

    await setTokenCookie(res, user);
    res.status(200);
    return res.json(user.toSafeObject());
  }
);

module.exports = router;
