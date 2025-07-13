const express = require("express");
const router = express.Router();
const wrapAsync = require("../utiles/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoginedIn ,isOwner,validateListing} = require("../middleware.js");
const  listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoginedIn,
  upload.single('listing[image]'),
 validateListing, 
wrapAsync(listingController.createListig));

// //NEW-ROUTE//
router.get("/form/new", isLoginedIn,listingController.RendernewForm);


router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoginedIn,isOwner,
 upload.single('listing[image]'),
 validateListing,
wrapAsync(listingController.updateListing))
.delete( isLoginedIn,isOwner, wrapAsync(listingController.destroyListing));


router.get("/:id/edit",isLoginedIn,isOwner,wrapAsync(listingController.editListing));


module.exports= router;










