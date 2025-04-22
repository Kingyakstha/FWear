import { useState ,useEffect} from 'react'
// import {Home} from './pages'
import { Footer, Navbar} from './Components'
import { Outlet } from 'react-router-dom'
import authService from '../src/appwrite/auth';
import {login as authLogin} from '../src/Context/authSlice'
import { useDispatch } from 'react-redux';
import { removeFromCart } from './Context/shopSlice';

function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(removeFromCart('666'))
  })
  useEffect(() => {
    const userAuth=authService.getCurrentUser()
    if  (userAuth){
      console.log('user ',userAuth)
    dispatch(authLogin(userAuth))
    }

  },[]);
  return (
    <>
    <Navbar />
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App
