import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { addToCart, getCartItems, removeFromCart } from "../controller/cart.controller.js"

const router= Router()

router.route("/add-cart/:productid").post(verifyJWT,addToCart)
router.route("/remove-cart/:cartid").post(removeFromCart)

router.route("/get-cartitem").get(verifyJWT,getCartItems)
export default router