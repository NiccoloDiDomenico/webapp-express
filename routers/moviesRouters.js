//Import
const express = require('express');
const movieControllers = require('../controllers/movieControllers');
const router = express.Router();
const publicUpload = require('../middlewares/fileUpload');

// Index
router.get("/", movieControllers.index);

// Show
router.get("/:slug", movieControllers.show);

// Store - movie
router.post("/", publicUpload.single('image'), movieControllers.storeMovie);

// Store - movie review
router.post("/:id/reviews", movieControllers.storeReview);

// Export
module.exports = router;