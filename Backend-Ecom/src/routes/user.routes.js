import {Router} from "express"
import { loginUser, registerUser , logoutUser, refreshAccessToken, changeCurrentPassword, changeAvatar, getCurrentUser} from "../controller/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"

const router= Router()

router.route("/register").post(
    upload.single('avatar'),
    registerUser)

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").get(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").patch(verifyJWT,changeCurrentPassword)
router.route("/change-avatar").patch(verifyJWT,upload.single("avatar"),changeAvatar)

router.route("/get-currentuser").get(verifyJWT,getCurrentUser)

export default router
