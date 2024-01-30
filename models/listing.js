const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        // type:String,
        // default: "https://www.wbcsd.org/var/site/storage/images/media/page-assets/imperative/nature-action/nature-action-intro/243120-2-eng-GB/Nature-action-intro_i1140.jpg",
        // set: (v) => v === "" ? "https://www.wbcsd.org/var/site/storage/images/media/page-assets/imperative/nature-action/nature-action-intro/243120-2-eng-GB/Nature-action-intro_i1140.jpg" : v,
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

listingSchema.post("findOneAndDelete",async (listing) => {
    if(listing) {
        await Review.deleteMany({_id : {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;

