const express = require('express');
const router = express.Router({mergeParams:true}); // ✅ Corrected
const wrapAsync = require('../utils/wrapAsync.js');
const { isLoggedIn, isReviewAuthor,validateReview } = require('../middleware'); // ✅ Ensure it's imported
const reviewController = require('../controllers/reviews.js')

// ✅ Add Review to Listing
router.post("/", 
    isLoggedIn,
    validateReview, 
    wrapAsync(reviewController.createReview));

// ❌ Delete review  route

router.delete(
    '/:reviewId',
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.deleteReview));

module.exports = router;