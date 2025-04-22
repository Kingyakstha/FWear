import {Router} from "express"
import { addImages, changeColor, getImagenColor, removeImage } from "../controller/imagencolor.controller.js"
import { upload } from "../middlewares/multer.middleware.js"

const router= Router()

router.route("/addImage/:productid").post(upload.single("image"),addImages)
router.route("/deleteImage/:imgid").post(removeImage)

router.route("/changeColor/:imgid").patch(changeColor)
router.route("/getImages/:productid").get(getImagenColor)

export default router