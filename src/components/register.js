import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Axios from 'axios'
import { motion } from 'framer-motion'

// IMAGES 
import Logo from '../images/login/login-logo.png';
import Back from '../images/login/arrow-back.svg'
import Arrow from '../images/register/arrow-page.svg'
import Check from '../images/register/done.gif'

// STYLE
import '../style/register.scss'

// COMPONENTS
import ScrollToTop from "../ScrollToTop";
import RegEmail from './register-email'
import RegPass from './register-password'
import Done from '../components/done'

// SLICES
import { toggleActive } from '../features/navSlice.js'
import { setEmail, setPassword } from "../features/registerSlice";
import { setErr } from '../features/errSlice'

const Register = () => {

    Axios.defaults.withCredentials = true;

    const dispatch = useDispatch();
    const regEmail = useSelector((state) => state.updateRegister.email);
    const regPassword = useSelector((state) => state.updateRegister.password);

    const err = useSelector((state) => state.errSlice.value);


    // STATES
    const [page, setPage] = useState(1);
    const [regDone, setReg] = useState(false)
    const [enabled, setEnabled] = useState(true)
    const [debounce, setDebounce] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(toggleActive({isActive: false}))

      return () => {
        dispatch(setErr({msg: ''}))
        dispatch(setEmail({value: ''}))
        dispatch(setPassword({value: ''}))
        dispatch(toggleActive({isActive: true}))

      }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    
    const navLogin = () => {
        dispatch(setErr({msg: ''}))
        navigate('/login', {replace: true})
    }

    function isValid(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const patternValidation = val => {
        return /\s/g.test(val);
      };
    
    const handleNext = () => {

        if (page === 1 && debounce === false) {
            if (!isValid(regEmail.value)) {
                dispatch(setErr({msg: 'Invalid Email!'}))

            } else {
                Axios.post("https://unix.herokuapp.com/checkEmail", {email: regEmail.value}).then((response) => {
                    if (response.data.valid === false) {
                        dispatch(setErr({msg: 'This email is already in use.'}))
                        console.log(response.data)

                    } else {
                        console.log(response.data)
                        setPage((current) => current + 1)
                        dispatch(setErr({msg: ''}))
                        setDebounce(true)
                        console.log(debounce)

                    }
                    
                })

            }
        } else if (page === 2 && debounce) {
            console.log(debounce)
            let hasSpace = patternValidation(regPassword.value)
            if (regPassword.value === '') {
                dispatch(setErr({msg: 'Password cannot be empty!'}))
            } else if (regPassword.value <= 3) {
                dispatch(setErr({msg: 'Password is too weak!'}))

            } else if (hasSpace) {
                dispatch(setErr({msg: 'Empty spaces are not allowed.'}))

            } else {
                console.log(regPassword.value)
                setPage((current) => current + 1)
                dispatch(setErr({msg: ''}))
            }
        } else if (page === 3) {
            console.log("in 3")
            const userEmail = regEmail.value
            const userPassword = regPassword.value

            if (enabled) {
                setEnabled(false)
                Axios.post('https://unix.herokuapp.com/register', {email: userEmail, password: userPassword}).then((response) => {
                    if (response) {
                        setReg(true)
    
                        setTimeout(() => {
                            navigate("/login", {replace: true})
                            setEnabled(true)
                        }, 1500);
                    }
                })
            }
        }

    }

    
    

    const registerDone = (
        <>
            <motion.div className="done-bg"
            initial={{scale: 0}} animate={{ scale: 1 }} transition={{delay: 0.2}} exit={{scale: 0}}>
                <div className="check-container">
                    <img src={Check} className="done-check" alt="Check"></img>
                    <h1 className="poppins done-text">Account created successfuly!</h1>
                </div>
            </motion.div>
        </>
    )

    const handleHome = () => {
        dispatch(toggleActive({isActive: true}))
        navigate("/", {replace: true})
    }

    const errormsg = (
        <>
            <motion.p initial={{scale: 0, x: -250}} animate={{scale: 1, x: 0}} className="error-handler poppins">{err.msg}</motion.p>
        </>
    )

    const handleBack = () => {
        
        if (page === 1) {
            navigate("/", {replace: true})
        } else {
            setPage((current) => current - 1)
        }
    }


    return (
        <>
            <ScrollToTop/>
            <motion.section className='register-wrapper'
            initial={{width: 0}} animate={{width: "100%"}} exit={{x: window.innerWidth}} transition={{delay: 0.2}}>
                <nav className='register-nav'>
                    <div className='nav-inner'>
                        <img src={Logo} className='register-nav-logo' alt={Logo} onClick={handleHome}></img>
                    </div>
                </nav>
                
                <div className='register-hero-outer'>
                    <img className='element1 elements-register' src="https://unix-shop.s3.ap-southeast-1.amazonaws.com/element.webp" alt="Element"></img>
                    <img className='element2 elements-register' src="https://unix-shop.s3.ap-southeast-1.amazonaws.com/element.webp" alt="Element"></img>
                    
                    <div className='register-hero'>
                        <h1 className='existing poppins'><span>Register</span> TO YOUR EXISTING ACCOUNT</h1>
                        <div className='register-box'>
                            <div className='arrow-container' onClick={handleBack}>
                                <img className='arrow-back' src={Back} alt={Back}></img>
                                <p className='register-back primary'>Back</p>
                            </div>

                            <img src={Logo} className="register-logo-inner" alt="Logo"></img>

                            <div className="register-pages-container">

                                <div className="register-1 reg-circles"><p className="regtext1">Verify Email</p></div>
                                <img src={Arrow} className="Arrow1 reg-arrows" alt="Arrow"></img>

                                <div className="register-2 reg-circles" style={page >= 2 ? {backgroundColor: '#2E838E'} : {backgroundColor: '#D9D9D9'}}><p className="regtext2">Create Password</p></div>
                                <img src={Arrow} className="Arrow2 reg-arrows" alt="Arrow"></img>

                                <div className="register-3 reg-circles" style={page >= 3 ? {backgroundColor: '#2E838E'} : {backgroundColor: '#D9D9D9'}}><p className="regtext3">Done</p></div>
                            </div>

                            <form className='register-form' onSubmit={handleSubmit}>


                                {page === 1 ? <RegEmail key="regEmail"/> : 
                                page === 2 ? <RegPass key="regPass"/> : 
                                page === 3 ? <Done/> : null}
                                
                                {err.msg === '' ? null : errormsg}
                                <input type="button" className='register-submit' name="register-submit" value={page === 3 ? "Confirm" : "Next"} onClick={handleNext}></input>
                                <p className='login primary' onClick={navLogin} style={{color: '#2E838E'}}>Login</p>
                                
                            </form>
                        </div>
                    </div>
                </div>
                
            </motion.section>
            {regDone ? registerDone : null}
        </>
    )
}

export default Register