import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

import Axios from 'axios'


// STYLES
import './App.scss'

// IMAGES
import Logo from './images/logo.png'
import Search from './images/search.svg'
import Burger from './images/burger.svg'
import Close from './images/close.svg'
import Polygon from './images/polygon.svg'

// FOOTER SOC MED IMAGES
import Fb from './images/footer/001-facebook.svg'
import Ig from './images/footer/011-instagram.svg'
import Linked from './images/footer/010-linkedin.svg'
import Tiktok from './images/footer/016-tiktok.svg'

// COMPONENTS
import Hero from './components/hero'
import Login from './components/login'
import Signup from './components/register'
import PrivateCart from './privateRoutes/privateCart'
import About from './components/about'
import Error from './components/error'

// Reducers
import { toggleActive } from './features/navSlice.js'
import { setStatus } from './features/statusSlice'
import { getItems } from './features/productSlice'
import { handleCart } from './features/cartSlice'

function App() {

  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;

  const dispatch = useDispatch();
  const toggleNav = useSelector((state) => state.toggleNav.value)
  const user = useSelector((state) => state.statusSlice.value)
  const products = useSelector((state) => state.prodSlice.value)
  const navCart = useSelector((state) => state.cartSlice.value)

  // STATES
  const [cartDrop, setCartDrop] = useState(false)
  const [side, setSide] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
      // TO ACTIVATE NAV BAR
    const path = window.location.pathname

    if (path === '/login' || path === '/signup') {
      dispatch(toggleActive({isActive: false}))
    } else {
      dispatch(toggleActive({isActive: true}))
    }
    
    if(path === '/cart') {
      dispatch(handleCart({onCart: true}))
    } else {
      dispatch(handleCart({onCart: false}))
    }

    Axios.get("https://unix.herokuapp.com/login").then((response) => {
      if (response.data?.user) {
        const clientEmail = response.data.user[0].email
        setLoggedIn(true)

        Axios.post('https://unix.herokuapp.com/products', {email: clientEmail}).then((response) => {
          const items = response.data.items
          let itemList = []
    
          items.forEach((item) => {
            itemList.push(item)
          })
    
          dispatch(getItems({items: itemList}))
        })

      }
    })

  }, [])

  

  const toggleCart = () => {
    if (user.status) {
      setCartDrop(true)
    }
  }

  const toggleCartOut = () => {
    setCartDrop(false)
  }

  const handleLogin = (e) => {
    console.log(user.status)
    const id = e.currentTarget.id
    if (user.status) {

      Axios.post("https://unix.herokuapp.com/logout").then((response) => {

      if(response.data.out) {
        dispatch(setStatus({status: false}))
        window.location.reload(false);
        console.log(response.data)

      } else {
        console.log(response.data)
      }

      }, [])
    } else {
      if (id === 'login') {
        setSide(!side)
      }
      navigate("/login", {replace: true})
      dispatch(toggleActive({isActive: false}))
    }
  }

  const handleSide = () => {
    setSide(!side)
  }

  const handleHome = () => {
    dispatch(toggleActive({isActive: true}))
    navigate("/", {replace: true})
  }

  const cartVariants = {
    visible: {
      scale: 1,
      originX: "95%",
      originY: "0%",
      transform: {
        duration: 0.5
      }
    },
    hidden: {
      scale: 0,
      originX: "95%",
      originY: "0%",
      transform: {
        duration: 0.5
      }
    }
  }

  const navigateCart = (e) => {
    if (e.currentTarget.id === "sidecart") {
      setSide(!side)
    }
    navigate("/cart", {replace: true})
  }



  const dropdownCart = (
    <motion.div className='cart-dropdown' variants={cartVariants} initial="hidden" animate="visible" exit="hidden"  onMouseOver={toggleCart} onMouseOut={toggleCartOut}>
      <img src={Polygon} className="polygon-nav" alt="Polygon"></img>
      <div className='hover-cart' onClick={navigateCart}></div>
      <p className='recently-added'>Recently Added</p>

      <div className='products-container'>
        {products.items.map((items) => {

          const base64String = btoa(new Uint8Array(items.img.data.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
          }, '')
          )

          return (
            <div className='user-items' key={items._id}>
              <div className='product-drop-img-container'>
                <img src={`data:image/webp;base64,${base64String}`}/>
              </div>
              <div className='productName'>{items.productName}</div>
              <div className='productPrice'>₱{items.total}</div>
            </div>
          )
        })}
        
      </div>
    </motion.div>
  )

  const handleAbout = (e) => {
    if (e.currentTarget.id === "sideabout") {
      setSide(!side)
    }

    navigate('/about',{replace: true})
    
  }


  const handle404 = (e) => {
    if (e.currentTarget.id === "sidehelp") {
      setSide(!side)
    }
    navigate('/404', {replace: true})
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
        <img src={Burger} className='burger' alt="Menu" onClick={handleSide}></img>
        <div className='cart' onMouseOver={toggleCart} style={navCart.onCart ? {display: "none"} : {display: "block"}}></div>

        <ul className='nav-ul'>
          <li className='wishlist' onClick={handleAbout}>ABOUT US</li>
          <li className='my-cart' onClick={handle404}>HELP</li>
          <li className='login' onClick={handleLogin}>{user.status ? "LOGOUT" : "LOGIN"}</li>
        </ul>

        <AnimatePresence>
          {cartDrop ? dropdownCart : null}
        </AnimatePresence>

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
                <li className='footer-items' onClick={handleAbout}>About us</li>
                <li className='footer-items' onClick={handle404}>Contact us</li>
                <li className='footer-items' onClick={handle404}>Services</li>

              </ul> 

              <ul className='footer-ul2'>
                <li className='footer-items' onClick={handle404}>Events</li>
                <li className='footer-items' onClick={handle404}>Privacy Policy</li>
                <li className='footer-items' onClick={handle404}>Terms of use</li>
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

  const menuVariants = {
    shownMain: {
      x: "-100%",
      transition: {
        delay: 0.25,
        ease: "easeInOut",

        duration: 0.7
      }
    },

    shownSlide: {
      x: "-100%",
      transition: {
        delay: 0.05,
        ease: "easeInOut",
        duration: 0.7
      }

    },
    hidden: {
      x: "100%",
    },

    exitSlide: {
      x: "100%",
      transition:{
        delay: 0.25,
        ease: "easeInOut",
        duration: 0.7
      }
    },

    exitMain: {
      x: "100%",
      transition:{
        delay: 0.05,
        ease: "easeInOut",
        duration: 0.7
      }
    }


  }

  const sideMenu = (
    <>
      <motion.div className='sideMenu-wrapper' variants={menuVariants} initial="hidden" >
        <motion.div 
        variants={menuVariants} initial="hidden" animate={side ? "shownSlide" : "exitSlide"} exit="exitSlide"
        className='sideMenu-slider'>
          <p className='unix-sidemenu'>UNIX</p>
        </motion.div>

        <motion.div 
        variants={menuVariants} initial="hidden" animate={side ? "shownMain" : "exitMain"} exit="exitMain"
        className='sideMenu-container'>
          <img className='side-close' alt="close" src={Close} onClick={handleSide}></img>
          <ul className='sidemenu-ul'>
            <li className='side-about' id="sideabout" onClick={handleAbout}>About us</li>
            <li className='side-cart' id="sidecart" onClick={navigateCart}>My Cart</li>
            <li className='side-help' id="sidehelp" onClick={handle404}>Help</li>

            <li className='side-login' id="login" onClick={handleLogin}>{user.status ? "LOGOUT" : "LOGIN"}</li>
          </ul>
        </motion.div>
      </motion.div>
    </>
  )




  return (
    <>
      <div className='main-div'>
        {toggleNav.isActive ? navBar : null}
        {sideMenu}
        

        <AnimatePresence>
        
          <Routes>
            <Route exact path="/" element={<Hero/>}></Route>
            <Route exact path="/login" element={<Login/>}></Route>
            <Route exact path="/signup" element={<Signup/>}></Route>
            <Route exact path="/cart" element={<PrivateCart/>}></Route>
            <Route exact path="/about" element={<About/>}></Route>
            <Route exact path="*" element={<Error/>}></Route>

          </Routes>
        </AnimatePresence>

        {footer}
      </div>
    </>
  );
  
}

export default App;
