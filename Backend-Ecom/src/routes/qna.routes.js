import { Router } from "express";
import { addAnswer, addQuestion, changeQuestion, getQnas, removeAnswer, removeQuestion } from "../controller/qna.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router= Router()

router.route("/add-question/:productid").post(verifyJWT,addQuestion)
router.route("/add-answer/:questionid").post(addAnswer)

router.route("/change-question/:questionid").post(changeQuestion)
router.route("/remove-answer/:questionid").post(removeAnswer)
router.route("/remove-question/:questionid").post(removeQuestion)

router.route("/get-qna/:productid").get(getQnas)
export default router