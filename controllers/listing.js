const Listing = require('../models/listing');


module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("Listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("Listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: {
            path: "author",
        },
    })
    .populate("owner");

    if (!listing) {
        req.flash("error","Listing you requested for does not exists!")
        return res.redirect("/listings")
    }

    res.render("Listings/show.ejs", { listing });
}


module.exports.createNewListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    if (!req.body.listing) {
        throw new ExpressError("Invalid Listing Data", 400);
    }

    // ✅ Ensure req.user exists
    if (!req.user) {
        req.flash("error", "You must be logged in to create a listing.");
        return res.redirect("/login");
    }

    // ✅ Assign owner directly in the object
    const newListing = new Listing({
        ...req.body.listing,  // Spread existing listing data
        owner: req.user._id    // Assign owner automatically
    });
    newListing.image = {url,filename};

    await newListing.save();  // ✅ Save listing with owner field

    req.flash("success", "New Listing Created");
    res.redirect("/listings");
}



module.exports.editListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error","Listing you requested for does not exists!")
        res.redirect("/listings")
    }
    res.render("Listings/edit.ejs", { listing });
}


module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    if (typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save();

    };
    req.flash("success","New Listing Updated");
    res.redirect("/listings");
};

module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
        throw new ExpressError("Listing Not Found", 404);
    };
    req.flash("success","Listing Deleted");
    res.redirect('/listings');
}