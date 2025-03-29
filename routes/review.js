const express = require("express");
const router = express.Router();
const wrapAsync = require("../utiles/wrapAsync.js");
const ExpressError = require("../utiles/ExpressError.js");
const {listingSchema , reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");



// ReviewSchema validation//
const validateReview = (req,res,next) =>{
  let {error} = reviewSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else{
    next();
  }
};


//REVIEW//
//post  review route
router.post("/", validateReview, wrapAsync(async(req, res) => {
  console.log(req.body); // Debugging
  let { id } = req.params;
  const list = await Listing.findById(id);
  let newReview = new Review(req.body.review);

  list.reviews.push(newReview);
  await newReview.save();
  await list.save();
  res.redirect(`/listings/${id}`);
}));



router.delete("/:reviewId", wrapAsync(async (req, res) => {
  let { id, reviewId } = req.params;


  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });


  await Review.findByIdAndDelete(reviewId);

  res.redirect(`/listings/${id}`);
}));

module.exports= router;