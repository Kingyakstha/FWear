import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"

const app=express()

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json({
    limit:"16kb"
}))
app.use(express.static("public"))

// routes import
import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js"
import imageRouter from "./routes/imagencolor.routes.js"
import cartRouter from "./routes/cart.routes.js"
import qnaRouter from "./routes/qna.routes.js"
import ratingRouter from "./routes/rating.routes.js"
import reviewRouter from "./routes/review.routes.js"
import saveRouter from "./routes/save.routes.js"

//routese declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/products",productRouter)
app.use("/api/v1/images",imageRouter)
app.use("/api/v1/carts",cartRouter)
app.use("/api/v1/qnas",qnaRouter)
app.use("/api/v1/ratings",ratingRouter)
app.use("/api/v1/reviews",reviewRouter)
app.use("/api/v1/saves",saveRouter)

export {app}