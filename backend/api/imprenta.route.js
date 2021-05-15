import express from "express"
//import RestaurantsCtrl from "./restaurants.controller.js"
//import ReviewsCtrl from "./review.controller.js"

const router = express.Router()

router.route("/").get((req, res) => res.send("Kon'nichiwa sekai"))
/*
router.route("/").get(RestaurantsCtrl.apiGetRestaurants) //Returs a list of restaurants
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById) //Returns a specific restaurant with a specific id and with all te reviews asociated to that restaurant
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines) //Return a list of cuisines

router
    .route("/review")
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)
*/
export default router