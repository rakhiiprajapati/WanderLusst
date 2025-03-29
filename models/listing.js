const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    url: {
      type: String,
      default:
        "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=",
      set: (v) =>
        v === ""
          ? "https://unsplash.com/photos/a-sunflower-in-a-field-of-green-leaves-Wdz8MQ_eSA4"
          : v,
    },
  },
  price: {
    type: Number
  },
  location: {
    type: String
  },
  country: {
    type: String
  },
  reviews: [{ 
    type: Schema.Types.ObjectId, 
    ref: "Review" 
  }] // Reviews field to store review references
});


listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}});

  }

});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;