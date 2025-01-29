//Import
const express = require('express');
const movieControllers = require('../controllers/movieControllers');
const router = express.Router();

// Index
router.get("/", movieControllers.index);

// Show
router.get("/:slug", movieControllers.show);

// Store
router.post("/:id/reviews", movieControllers.storeReview);

// Export
module.exports = router;