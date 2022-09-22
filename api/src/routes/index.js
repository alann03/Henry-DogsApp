const { Router } = require("express");
const dogsRouter = require("./dogsRouter");
const temperamentsRouter = require("./temperamentsRouter");

const router = Router();

router.use("/dogs", dogsRouter);
router.use("/temperaments", temperamentsRouter);

module.exports = router;
