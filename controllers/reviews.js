const Review = require('../models/review.js');
const Listing = require("../models/listing");
const { reviewSchema } = require('../schema.js');
const ExpressError = require('../utils/ExpressError.js');

module.exports.createReview = async (req, res) => {
        
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
        throw new ExpressError("Listing Not Found", 404);
    }

    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    await newReview.save();
    listing.reviews.push(newReview._id);
    await listing.save();
    req.flash("success","New Reviews Created");

    console.log("⭐ New review saved");
    res.redirect(`/listings/${listing._id}`);
};


module.exports.deleteReview = async (req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash("success"," Review Deleted");
    console.log("❌ Deleting Review")
    res.redirect(`/listings/${id}`)
};