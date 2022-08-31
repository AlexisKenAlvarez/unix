import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScrollToTop from '../ScrollToTop';

// STYLE
import '../style/login.scss'

// IMAGES
import Logo from '../images/login/login-logo.png';
import Back from '../images/login/arrow-back.svg'
import Show from '../images/login/show.svg'
import Hide from '../images/login/hide.svg'
import Element from '../images/login/element.webp'


const Form = () => {
    const navigate = useNavigate()
    const [shown, setShown] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleToggle = () => {
        setShown(!shown)
    }

    const emailref = useRef();
    const passref = useRef();


    useEffect(() => {
        emailref.current.focus();
    }, [])

    const emailRef = () => {
        emailref.current.focus();
    }

    const passRef = () => {
        passref.current.focus();
    }
    
    const navSignup = () => {
        navigate('/signup', {replace: true})
    }


     return (
        <>
            <ScrollToTop/>
            <section className='login-wrapper'>
                <nav className='login-nav'>
                    <div className='nav-inner'>
                        <img src={Logo} className='login-nav-logo' alt="Logo"></img>
                    </div>
                </nav>
                
                <div className='login-hero-outer'>
                    <img className='element1 elements-login' src={Element} alt="Element"></img>
                    <img className='element2 elements-login' src={Element} alt="Element"></img>
                    
                    <div className='login-hero'>
                        <h1 className='existing poppins'><span>LOGIN</span> TO YOUR EXISTING ACCOUNT</h1>
                        <div className='login-box'>
                            <div className='arrow-container'>
                                <img className='arrow-back' src={Back} alt="Back"></img>
                                <p className='login-back primary'>Back</p>
                            </div>

                            <img src={Logo} className="login-logo-inner" alt="Logo"></img>

                            <form className='login-form' onSubmit={handleSubmit}>

                                <div className='login-email-wrapper'>
                                    <p className='email-label primary' onClick={emailRef}>Email:</p>
                                    <input type="text" className='email-input input-box' name='email-input' ref={emailref}></input>
                                </div>

                                <div className='login-password-wrapper'>
                                    <p className='password-label primary' onClick={passRef}>Password:</p>
                                    <input type={shown ? "text" : "password"} className='password-input input-box' name='password-input' ref={passref}></input>
                                    <img alt="Toggle password" src={shown ? Show : Hide} className="togglePassword" onClick={handleToggle} style={shown ? {top: "3.2rem"} : {top: '3.5rem'}}></img>
                                    
                                </div>
                                
                                <input type="submit" className='login-submit' name="login-submit" value="Login"></input>
                                <p className='signup primary' onClick={navSignup}>Sign up</p>
                            </form>
                        </div>
                    </div>
                </div>
                
            </section>
        </>
     )
}
export default Form