import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { addReview, changeReview, getReviews, removeReview } from "../controller/review.controller.js"


const router= Router()

router.route("/add-review/:productid").post(verifyJWT,addReview)
router.route("/change-review/:reviewid").post(changeReview)
router.route("/remove-review/:reviewid").post(removeReview)

router.route("/get-review/:productid").get(getReviews)

export default router