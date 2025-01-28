//Import
const express = require('express');
const movieControllers = require('../controllers/movieControllers');
const router = express.Router();

// Index
router.get("/", movieControllers.index)

// Show
router.get("/:slug", movieControllers.show)

// Export
module.exports = router;