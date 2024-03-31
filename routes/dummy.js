const express = require("express");
const router = express.Router();

// import controller
const { dummyLink } = require("../controllers/dummyController");

// maping create
router.get("/dummyRoute", dummyLink);

// export
module.exports = router;
