const { Router } = require("express");
const getTemperaments = require("../controllers/getTemperaments");

const router = Router();

router.get("/", getTemperaments);

module.exports = router;
