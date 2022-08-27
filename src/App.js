import React from 'react'
import { Route, Routes, useNavigate } from "react-router-dom"

// STYLES
import './App.scss'

// IMAGES
import Logo from './images/logo.png'
import Send from './images/send-svgrepo-com.svg'
import Search from './images/search.svg'
import Burger from './images/burger.svg'

// FOOTER SOC MED IMAGES
import Fb from './images/footer/001-facebook.svg'
import Ig from './images/footer/011-instagram.svg'
import Linked from './images/footer/010-linkedin.svg'
import Tiktok from './images/footer/016-tiktok.svg'

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

const footer = (
  <>
    <footer className='footer-wrapper'>
      <div className='footer-container'>
        <img src={Logo} className="footer-logo"></img>

        {/* FOOTER MAIL CONTAINER */}
        <div className='footer-mail-container'>
          <p className='newcomer'>If you want to stay informed for our special offers, subscribe below!</p>
          <form className='footer-form'>
            <input type="text" placeholder='example@yahoo.com' autoComplete='off' id="sendmail" name="sendmail" className='sendmail'></input>
            <div className='footer-send-button'></div>
          </form>
        </div>

        {/* FOOTER MORE INFORMATION */}
        <div className='footer-information-container'>
          <h1 className='footer-info'>INFORMATION</h1>

          <div className='footer-list'>
            <ul className='footer-ul1'> 
              <li className='footer-items'>About us</li>
              <li className='footer-items'>Contact us</li>
              <li className='footer-items'>Services</li>

            </ul> 

            <ul className='footer-ul2'>
              <li className='footer-items'>Events</li>
              <li className='footer-items'>Privacy Policy</li>
              <li className='footer-items'>Terms of use</li>
            </ul>
          </div>

          {/* SOC MEDS */}
          <div className='footer-socmed-container'>
            <img src={Fb} className="footer-fb footer-soc"></img>
            <img src={Ig} className="footer-ig footer-soc"></img>
            <img src={Linked} className="footer-linked footer-soc"></img>
            <img src={Tiktok} className="footer-tiktok footer-soc"></img>
          </div>
        </div>

        
      </div>
      <div className='footer-line'></div>
      <p className='footer-allrights'>© 2022 UNIX. All Rights Reserved.</p>
    </footer>
  </>
)

function App() {
  return (
    <>
      <div className='main-div'>
        {navBar}
        
        <Routes>
          <Route exact path="/" element={<Hero/>}></Route>
        </Routes>

        {footer}
      </div>


    </>
  );
  
}

export default App;
