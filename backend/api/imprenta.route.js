import express from "express"
import ProductosCtrl from "./productos.controller.js"
//import ReviewsCtrl from "./review.controller.js"

const router = express.Router()

router.route("/").get(ProductosCtrl.apiGetProductos)
/*
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById) //Returns a specific restaurant with a specific id and with all te reviews asociated to that restaurant
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines) //Return a list of cuisines

router
    .route("/review")
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)
*/
export default router