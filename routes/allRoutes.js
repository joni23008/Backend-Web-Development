const express = require("express");
const router = express.Router();

const homeRoutes = require("./home");
const authRoutes = require("./auth");
const dbRouter = require("./DB");
const reviewRoutes = require("./reviewRoutes");

router.use("/", homeRoutes);
router.use("/auth", authRoutes);
router.use("/DB", dbRouter);
router.use("/api/review", reviewRoutes);

module.exports = router;
