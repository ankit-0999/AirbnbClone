const Listing = require('./models/listing.js')
const Review = require('./models/review.js')
const {listingSchema,reviewSchema} = require('./schema.js')
const ExpressError = require('./utils/ExpressError.js');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl; // ✅ Save the URL user was trying to access
        req.flash("error", "You must be logged in to create a listing.");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        delete req.session.redirectUrl; // ✅ Clear the session after using it
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    // ❌ BUG: `listing.owner._id` might be undefined, so we must check it properly
    if (!listing.owner || !listing.owner.equals(req.user._id)) {
        req.flash("error", "You are not the owner of this listing!");
        return res.redirect(`/listings/${id}`);  // ✅ Ensure to `return` to stop further execution
    }

    next();  // ✅ Only call next() if the user is the owner
};


module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(error.details.map((err) => err.message).join(', '), 400);
    }
    next();
};

// ✅ Validate Review Middleware
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new ExpressError(error.details.map((err) => err.message).join(', '), 400);
    }
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;

    // ✅ Check if review exists
    const review = await Review.findById(reviewId);
    if (!review) {
        req.flash("error", "Review not found!");
        return res.redirect(`/listings/${id}`);
    }

    // ✅ Use `req.user._id` to check ownership
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You are not the author of this review!");
        return res.redirect(`/listings/${id}`);  // Stop further execution
    }

    next();  // ✅ Only proceed if the user is the review author
};
