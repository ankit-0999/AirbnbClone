const mongoose = require("mongoose");
const Review = require("./review.js");
const User = require('./user.js')
const { ref, types } = require("joi");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: { type: String, default: "default.jpg" }, // Default filename
        url: { 
            type: String, 
            default: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" 
        }
    },
    price: Number,
    location: String,
    country: String,
    reviews :[
        {
            type :mongoose.Schema.Types.ObjectId,
            ref:"Review",
        }
        
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
});

listingSchema.post("findOneAndDelete",async (listing)=>{
    if (listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;