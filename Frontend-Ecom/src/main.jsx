import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Cart, LoginSignup, Shop, ShopCategory,Product,AddProduct} from './pages'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import {Provider} from 'react-redux'
import {shopStore} from './Context/shopStore.js'
import men_banner from './Components/Assets/banner_mens.png'
import kid_banner from './Components/Assets/banner_kids.png'
import women_banner from './Components/Assets/banner_women.png'
// import AddProduct from './pages/AddProduct.jsx'
// import NewAddproduct from './Components/NewAddproduct.jsx'

const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Shop/>
      },
      {
        path:"/cart",
        element:<Cart/>
      },
      {
        path:"/men",
        element:<ShopCategory banner={men_banner} category="men" />
      },
      {
        path:"/women",
        element:<ShopCategory banner={women_banner} category="women" />
      },
      {
        path:"/kid",
        element:<ShopCategory banner={kid_banner} category="kids" />
      },
      {
        path:"/login",
        element:<LoginSignup category='login'/>
      },
      {
        path:"/signup",
        element:<LoginSignup category='signup' />
      },
      {
        path:"/product/:id",
        element:<Product/>
      },
      {
        path:"/addproduct",
        element:<AddProduct/>
      },
      // {
      //   path:"/tic",
      //   element:<Tictac/>
      // },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={shopStore}>
    <RouterProvider router={router}/>
  </Provider>

)
