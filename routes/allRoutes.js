const express = require("express");
const router = express.Router();
const cors = require('cors');

const homeRoutes = require("./homeRoutes");
const authRoutes = require("./auth");
const reviewRoutes = require("./reviewRoutes");
const profileRoutes = require("./profile");
const apiRoutes = require("./api");
const mobileAuthRoutes = require("./mobileAuth");
const CategoryRoutes = require("./category");
const GenresRoutes = require("./Genres");

router.use(cors());
router.use("/", homeRoutes);
router.use("/auth", authRoutes);
router.use("/review", reviewRoutes);
router.use("/profile", profileRoutes);
router.use("/mobileAuth", mobileAuthRoutes);
router.use("/", apiRoutes);
router.use("/category", CategoryRoutes);
router.use("/genres", GenresRoutes);

module.exports = router;
