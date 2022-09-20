import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScrollToTop from '../ScrollToTop';
import Axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import { motion } from 'framer-motion'

// STYLE
import '../style/login.scss'

// IMAGES
import Logo from '../images/login/login-logo.png';
import Back from '../images/login/arrow-back.svg'
import Show from '../images/login/show.svg'
import Hide from '../images/login/hide.svg'

// COMPONENTS
import { setLogin } from '../features/loginSlice'
import { toggleActive } from '../features/navSlice.js'


const Form = () => {

    Axios.defaults.withCredentials = true;
    const navigate = useNavigate()
    const [shown, setShown] = useState(false);

    const [err, setErr] = useState('')
    const loginData = useSelector((state) => state.loginSlice.value)
    const toggleNav = useSelector((state) => state.toggleNav.value)
    const dispatch = useDispatch()
  
    

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleToggle = () => {
        setShown(!shown)
    }

    const emailref = useRef();
    const passref = useRef();


    useEffect(() => {
        dispatch(toggleActive({isActive: false}))
        emailref.current.focus();

        return () => {
            console.log("nav active")
            dispatch(toggleActive({isActive: true}))
        }
    }, [])

    const emailRef = () => {
        emailref.current.focus();
    }

    const passRef = () => {
        passref.current.focus();
    }

    const handleEmail = () => {
        const email = emailref.current.value;
        dispatch(setLogin({email: email, password: loginData.password}))
    }

    const handlePassword = () => {
        const password = passref.current.value;
        dispatch(setLogin({email: loginData.email, password: password}))
    }
    
    const navSignup = () => {
        navigate('/signup', {replace: true})
    }

    const handleLogin = () => {
        Axios.post("https://unix.herokuapp.com/login", {email: loginData.email, password: loginData.password}).then((response) => {
            if (response.data.loggedIn) {
                dispatch(toggleActive({isActive: true}))
                navigate('/', {replace: true})
            } else {
                setErr("Invalid email or password!")
            }

        })
        
        
    }

    const handleHome = () => {
        dispatch(toggleActive({isActive: true}))
        navigate("/", {replace: true})
    }

    const errormsg = (
        <>
            <motion.p initial={{scale: 0, x: -250}} animate={{scale:1,x: 0}} className="error-handler">{err}</motion.p>
        </>
    )

     return (
        <>
            <ScrollToTop/>
            <motion.section className='login-wrapper'
            initial={{width: 0}} animate={{width: "100%"}} exit={{x: window.innerWidth}} transition={{delay: 0.2}}>
                <nav className='login-nav'>
                    <div className='nav-inner'>
                        <img src="https://unix-shop.s3.ap-southeast-1.amazonaws.com/login-logo.png" className='login-nav-logo' alt="Logo" onClick={handleHome}></img>
                    </div>
                </nav>
                
                <div className='login-hero-outer'>
                    <img className='element1 elements-login' src="https://unix-shop.s3.ap-southeast-1.amazonaws.com/element.webp" alt="Element"></img>
                    <img className='element2 elements-login' src="https://unix-shop.s3.ap-southeast-1.amazonaws.com/element.webp" alt="Element"></img>
                    
                    <div className='login-hero'>
                        <h1 className='existing poppins'><span>LOGIN</span> TO YOUR EXISTING ACCOUNT</h1>
                        <div className='login-box'>
                            <div className='arrow-container' onClick={handleHome}>
                                <img className='arrow-back' src={Back} alt="Back"></img>
                                <p className='login-back primary'>Back</p>
                            </div>

                            <img src={Logo} className="login-logo-inner" alt="Logo"></img>

                            <form className='login-form' onSubmit={handleSubmit}>

                                <div className='login-email-wrapper'>
                                    <p className='email-label primary' onClick={emailRef}>Email:</p>
                                    <input type="text" className='email-input input-box-login' name='email-input' ref={emailref} onChange={handleEmail} style={err === '' ? {border: "1px solid ##626A79"} : {border: "1px solid #EA2525"}}></input>
                                </div>

                                <div className='login-password-wrapper'>
                                    <p className='password-label primary' onClick={passRef}>Password:</p>

                                    <input type={shown ? "text" : "password"} className='password-input input-box' name='password-input' ref={passref} onChange={handlePassword} style={err === '' ? {border: "1px solid ##626A79"} : {border: "1px solid #EA2525"}}></input>

                                    <img alt="Toggle password" src={shown ? Show : Hide} className="togglePassword" onClick={handleToggle} style={shown ? {top: "3.2rem"} : {top: '3.5rem'}}></img>
                                    
                                </div>
                                
                                {err === '' ? null : errormsg}
                                <input type="submit" className='login-submit' name="login-submit" value="Login" onClick={handleLogin}></input>
                                <p className='signup primary' onClick={navSignup}>Sign up</p>
                            </form>
                        </div>
                    </div>
                </div>
                
            </motion.section>
        </>
     )
}
export default Form