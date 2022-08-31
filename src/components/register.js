import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// IMAGES 
import Logo from '../images/login/login-logo.png';
import Back from '../images/login/arrow-back.svg'
import Show from '../images/login/show.svg'
import Hide from '../images/login/hide.svg'
import Element from '../images/login/element.webp'
import Arrow from '../images/register/arrow-page.svg'

// STYLE
import '../style/register.scss'

// COMPONENTS
import ScrollToTop from "../ScrollToTop";
import { updateRegister } from "../features/registerSlice";
import RegEmail from './register-email'
import RegPass from './register-password'
import Done from '../components/done'

const Register = () => {

    const dispatch = useDispatch();
    const updateReg = useSelector((state) => state.updateRegister.value);
    const [page, setPage] = useState(1);

    const navigate = useNavigate()

    const [err, setErr] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    


    const navLogin = () => {
        navigate('/login', {replace: true})
    }

    function isValid(email) {
        return /\S+@\S+\.\S+/.test(email);
      }

    const handleNext = () => {
        if (page === 1) {
            if (!isValid(updateReg.email)) {
                setErr("Invalid Email!")
            } else {
                setPage((current) => current + 1)
                setErr('')
            }
        } else if (page === 2) {
            if (updateReg.password === '') {
                setErr("Password cannot be empty!")
            } else if (updateReg.password <= 3) {
                setErr("Password is too weak!")
            }else {
                setPage((current) => current + 1)
                setErr('')

            }
        }

    }


    return (
        <>
            <ScrollToTop/>
            <section className='register-wrapper'>
                <nav className='register-nav'>
                    <div className='nav-inner'>
                        <img src={Logo} className='register-nav-logo' alt={Logo}></img>
                    </div>
                </nav>
                
                <div className='register-hero-outer'>
                    <img className='element1 elements-register' src={Element} alt="Element"></img>
                    <img className='element2 elements-register' src={Element} alt="Element"></img>
                    
                    <div className='register-hero'>
                        <h1 className='existing poppins'><span>Register</span> TO YOUR EXISTING ACCOUNT</h1>
                        <div className='register-box'>
                            <div className='arrow-container'>
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


                                {page === 1 ? <RegEmail/> : 
                                page === 2 ? <RegPass/> : 
                                page === 3 ? <Done/> : null}
                                
                                <p className="poppins error-handler" style={err === '' ? {display: 'none'} : {display: 'block'}}>{err}</p>
                                <input type="button" className='register-submit' name="register-submit" value={page === 3 ? "Confirm" : "Next"} onClick={handleNext}></input>
                                <p className='login primary' onClick={navLogin}>Login</p>
                                
                            </form>
                        </div>
                    </div>
                </div>
                
            </section>
        </>
    )
}

export default Register