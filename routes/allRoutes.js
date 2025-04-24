const express = require("express");
const router = express.Router();

const homeRoutes = require("./home");
const authRoutes = require("./auth");
const dbRouter = require("./DB");
const reviewRoutes = require("./reviewRoutes");
const profileRoutes = require("./profile");

router.use("/", homeRoutes);
router.use("/auth", authRoutes);
router.use("/DB", dbRouter);
router.use("/api/review", reviewRoutes);
router.use("/profile", profileRoutes)

module.exports = router;
