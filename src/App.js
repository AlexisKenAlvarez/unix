import React from 'react'
import { Route, Routes, useNavigate } from "react-router-dom"

// STYLES
import './App.scss'

// IMAGES
import Logo from './images/logo.png'
import Send from './images/send-svgrepo-com.svg'
import Search from './images/search.svg'
import Burger from './images/burger.svg'

// COMPONENTS
import Hero from './components/hero'

const navBar = (
    <nav className="nav-wrapper">
      <div className='nav-container'>
        <img src={Logo} className="logo"></img>
        <div className="right-nav">
          <form className="myform">
            <input type="text" placeholder='Search' autoComplete='off' id="search" name="search" className="search-input"></input>
            <div className='search-button-div'>
              <img src={Search}></img>
            </div>
          </form>
        </div>
        <img src={Burger} className='burger'></img>
        <div className='cart'></div>

        <ul className='nav-ul'>
          <li className='wishlist'>WISHLIST</li>
          <li className='my-cart'>MY CART</li>
          <li className='login'>LOGIN</li>
        </ul>
      </div>
      <div className='line'></div>
    </nav>
)

function App() {
  return (
    <>
      <div className='main-div'>
        {navBar}
        
        <Routes>
          <Route exact path="/" element={<Hero/>}></Route>
        </Routes>
      </div>


    </>
  );
  
}

export default App;
