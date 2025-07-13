const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utiles/wrapAsync.js");
const ExpressError = require("../utiles/ExpressError.js");
const Review= require("../models/review.js");
// const {listingSchema , reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {validateReview , isLoginedIn ,isReviewAuthor} = require("../middleware.js");


const reviewController = require("../controllers/reviews.js");

//REVIEW//
//post  review route
router.post("/", 
  isLoginedIn,
  validateReview, wrapAsync(reviewController.createReview));



router.delete("/:reviewId",isLoginedIn,
   isReviewAuthor, 
   wrapAsync(reviewController.destroyReview));

module.exports= router;