const express = require("express");
const router = express.Router();

const homeRoutes = require("./home");
const authRoutes = require("./auth");
const reviewRoutes = require("./reviewRoutes");
const profileRoutes = require("./profile");
const apiRoutes = require("./api");

router.use("/", homeRoutes);
router.use("/auth", authRoutes);
router.use("/review", reviewRoutes);
router.use("/profile", profileRoutes);
router.use("/", apiRoutes);

module.exports = router;
