const express = require("express");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];
const router = express.Router();

//Log in
router.post(
  "/",
  // validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    if (!credential) {
      res.status(400);
      return res.json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          credential: "Email or username is required",
        },
      });
    }
    if (!password) {
      res.status(400);
      return res.json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          password: "Password is required",
        },
      });
    }
    const user = await User.login({ credential, password });

    if (!user) {
      // const err = new Error('Login failed');
      // err.status = 401;
      // err.title = 'Login failed';
      // err.errors = ['The provided credentials were invalid.'];
      res.status(401);
      return res.json({
        message: "Invalid credentials",
        statusCode: 401,
      });
    }

    await setTokenCookie(res, user);
    res.status(200);
    return res.json(user.toSafeObject());
  }
);

//Log Out
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

//Restore Session User
router.get("/", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json(user.toSafeObject());
  } else return res.json({});
});

module.exports = router;
