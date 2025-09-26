const express = require("express");
const router = express.Router();

const homeRoutes = require("./homeRoutes");
const authRoutes = require("./auth");
const reviewRoutes = require("./reviewRoutes");
const profileRoutes = require("./profile");
const apiRoutes = require("./api");
const mobileAuthRoutes = require("./mobileAuth");

router.use("/", homeRoutes);
router.use("/auth", authRoutes);
router.use("/review", reviewRoutes);
router.use("/profile", profileRoutes);
router.use("/mobileAuth", mobileAuthRoutes);
router.use("/", apiRoutes);

module.exports = router;
