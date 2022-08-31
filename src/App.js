import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'

// STYLES
import './App.scss'

// IMAGES
import Logo from './images/logo.png'
import Search from './images/search.svg'
import Burger from './images/burger.svg'

// FOOTER SOC MED IMAGES
import Fb from './images/footer/001-facebook.svg'
import Ig from './images/footer/011-instagram.svg'
import Linked from './images/footer/010-linkedin.svg'
import Tiktok from './images/footer/016-tiktok.svg'

// COMPONENTS
import Hero from './components/hero'
import Login from './components/login'
import Signup from './components/register'

// Reducers
import { toggleActive } from './features/navSlice.js'

function App() {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const toggleNav = useSelector((state) => state.toggleNav.value)


  // TO ACTIVATE NAV BAR
  useEffect(() => {
    const path = window.location.pathname

    if (path === '/login' || path === '/signup') {
      dispatch(toggleActive({isActive: false}))
    } else {
      dispatch(toggleActive({isActive: true}))
    }
    

  }, [])
  

  const redirectLogin = () => {
    navigate("/login", {replace: true})
    dispatch(toggleActive({isActive: false}))
  }

  const handleHome = () => {
    dispatch(toggleActive({isActive: true}))
    navigate("/", {replace: true})
  }

  const navBar = (
    <nav className="nav-wrapper">
      <div className='nav-container'>
        <img src={Logo} className="logo" onClick={handleHome} alt="Logo"></img>
        <div className="right-nav">
          <form className="myform">
            <input type="text" placeholder='Search' autoComplete='off' id="search" name="search" className="search-input"></input>
            <div className='search-button-div'>
              <img src={Search} alt="Search"></img>
            </div>
          </form>
        </div>
        <img src={Burger} className='burger' alt="Menu"></img>
        <div className='cart'></div>

        <ul className='nav-ul'>
          <li className='wishlist'>WISHLIST</li>
          <li className='my-cart'>MY CART</li>
          <li className='login' onClick={redirectLogin}>LOGIN</li>
        </ul>
      </div>
      <div className='line'></div>
    </nav>
  )

  const footer = (
    <>
      <footer className='footer-wrapper'>
        <div className='footer-container'>
          <img src={Logo} className="footer-logo" onClick={handleHome} alt="Logo"></img>

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
              <img src={Fb} className="footer-fb footer-soc" alt="Facebook"></img>
              <img src={Ig} className="footer-ig footer-soc" alt="Instagram"></img>
              <img src={Linked} className="footer-linked footer-soc" alt="LinkedIn"></img>
              <img src={Tiktok} className="footer-tiktok footer-soc" alt="Tiktok"></img>
            </div>
          </div>
          
          
        </div>
        <div className='footer-line'></div>
        <p className='footer-allrights'>© 2022 UNIX. All Rights Reserved.</p>
      </footer>
    </>
  )

  return (
    <>
      <div className='main-div'>
        {toggleNav.isActive ? navBar : null}
        
        <Routes>
          <Route exact path="/" element={<Hero/>}></Route>
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/signup" element={<Signup/>}></Route>

        </Routes>

        {footer}
      </div>


    </>
  );
  
}

export default App;
