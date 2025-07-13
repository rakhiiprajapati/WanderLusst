const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async(req, res) => {
  console.log(req.body); // Debugging
  let { id } = req.params;
  const list = await Listing.findById(id);
  let newReview = new Review(req.body.review);
   newReview.author = req.user._id;
   console.log(newReview)
  list.reviews.push(newReview);
  await newReview.save();
  await list.save();
  req.flash("success" ,"New Review Creted!")
  res.redirect(`/listings/${id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
req.flash("success" ," Review deleted")
  res.redirect(`/listings/${id}`);
};