import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { addRating, changeRating, removeRating } from "../controller/rating.controller.js"

const router= Router()

router.route("/add-rating/:productid").post(verifyJWT,addRating)
router.route("/change-rating/:ratingid").post(changeRating)
router.route("/remove-rating/:ratingid").post(removeRating)

export default router