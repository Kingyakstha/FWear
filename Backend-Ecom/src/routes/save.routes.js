import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { getSavedProduct, saveProduct, unsaveProduct } from "../controller/save.controller.js"

const router= Router()

router.route("/save-product/:productid").post(verifyJWT,saveProduct)
router.route("/unsave-product/:saveid").post(unsaveProduct)

router.route("/get-save").get(verifyJWT,getSavedProduct)

export default router