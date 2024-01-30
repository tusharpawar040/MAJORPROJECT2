const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
// const { route } = require("./user.js");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

//New route 
router.get("/new",isLoggedIn,listingController.renderNewForm);

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.createListing));
    // .post(upload.single('listing[image]'),(req,res) => {
    //     res.send(req.file);
    // });

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner,
        wrapAsync(listingController.destroyListing));


// //Index route 
// router.get("/",wrapAsync(listingController.index));

// //Show route
// router.get("/:id",wrapAsync(listingController.showListing));

// // Create Route
// router.post(
//     "/",
//     isLoggedIn,
//     validateListing,
//     wrapAsync(listingController.createListing));

// Edit Route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));

// // Update route
// router.put("/:id",
//     isLoggedIn,
//     isOwner,
//     validateListing,
//     wrapAsync(listingController.updateListing));

// // Delete route
// router.delete("/:id",
//     isLoggedIn,
//     isOwner,
//     wrapAsync(listingController.destroyListing));



module.exports = router;




