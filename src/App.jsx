import React from 'react'
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom'
import Header from './component/Header'
import Coins from './component/Coins'
import Home from './component/Home'
import Exchanges from './component/Exchanges'
import Coindetails from './component/Coindetails'
import Footer from './component/Footer'


function App() {


  return (
    <Router>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/coins' element={<Coins/>} />
        <Route path='/exchanges' element={<Exchanges/>} />
        <Route path='/coin/:id' element={<Coindetails/>} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
