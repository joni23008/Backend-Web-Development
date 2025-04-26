const express        = require("express");
const router         = express.Router();

const homeRoutes     = require("./home");
const authRoutes     = require("./auth");
const dbRouter       = require("./DB");
const reviewRoutes   = require("./reviewRoutes");
const apiRoutes      = require("./api");      

router.use("/",           homeRoutes);
router.use("/auth",       authRoutes);
router.use("/DB",         dbRouter);
router.use("/api/review", reviewRoutes);
router.use("/",        apiRoutes);       

module.exports = router;
