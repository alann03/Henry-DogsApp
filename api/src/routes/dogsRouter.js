const { Router } = require("express");
const deleteDogs = require("../controllers/dogDelete");
const getDogs = require("../controllers/getDogs");
const getById = require("../controllers/getDogsByID");
const postDogs = require("../controllers/postDog");
const updateDog = require("../controllers/dogUpdate");

const router = Router();

router.get("/", getDogs);
router.post("/", postDogs);
router.get("/:id", getById);
router.delete("/", deleteDogs);
router.put("/", updateDog);

module.exports = router;
