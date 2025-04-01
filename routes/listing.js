const express = require('express');
const router = express.Router(); // ✅ Corrected
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { listingSchema } = require("../schema.js"); // ✅ Import listingSchema
const Listing = require("../models/listing");
const {isLoggedIn,isOwner,validateListing} = require('../middleware.js');
const listingController = require('../controllers/listing.js');
const multer  = require('multer')
const {storage} = require("../cloudeConfig.js");
const upload = multer({ storage});
const dotenv = require('dotenv');
// ✅ Show All Listings

router
    .route("/")
    // ✅ show listing
    .get(wrapAsync(listingController.index))
    // ✅ Create New Listing
    .post(
        isLoggedIn, 
        // validateListing, 
        upload.single('listing[image]'),
        wrapAsync(listingController.createNewListing)
    );

// new route
router.get("/new",isLoggedIn, listingController.renderNewForm);


router
    .route("/:id")
    // ✅ Show Single Listing
    .get(wrapAsync(listingController.showListing))
    // ✅ Update Listing
    .put(isLoggedIn,isOwner,
        upload.single('listing[image]'),
        validateListing, wrapAsync(listingController.updateListing))
    // ✅ Delete Listing
    .delete(isLoggedIn,isOwner,
        wrapAsync(listingController.deleteListing));


// ✅ Show Edit Form
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.editListing));


module.exports = router;
