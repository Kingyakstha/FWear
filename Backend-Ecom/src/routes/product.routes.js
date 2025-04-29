import {Router} from "express"
import { addProduct,addMultipleProducts, deleteProduct, getProduct, getProductCategory, getProductGender, updateProduct } from "../controller/product.controller.js"

const router=Router()

router.route("/add-product").post(addProduct)
router.route("/add-multipleproduct").post(addMultipleProducts)
router.route("/delete-product/:productid").post(deleteProduct)
router.route("/edit-product/:productid").patch(updateProduct)

router.route("/get-product/:productId").get(getProduct)
router.route("/get-product-category/:Category").get(getProductCategory)
router.route("/get-product-gender/:Gender").get(getProductGender)
export default router 