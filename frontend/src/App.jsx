import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/pages/Dashboard'
import Products from './components/pages/Products'
import Cart from './components/pages/Cart'
import About from './components/pages/About'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Auth from './components/pages/Auth'
import Navbar from './components/navbar/Navbar'
import Footer from './components/Footer/Footer'
import AddProduct from './components/pages/Addproduct'
import './App.css'
function App() {


  return (
    <>
      <Navbar />
      
      <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/add-product" element={<AddProduct />} />  

      </Routes>
      <Footer />
      
    </>
  )
}

export default App
