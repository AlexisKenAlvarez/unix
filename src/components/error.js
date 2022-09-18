import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop';
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';

// STYLE
import '../style/error.scss'

// SLICE
import { setStatus } from '../features/statusSlice'


const Error = () => {

    const navigate = useNavigate()
    Axios.defaults.withCredentials = true
    const dispatch = useDispatch()
    const animation = useAnimation()

    const handleHome = () => {
    navigate("/", {replace: true})
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data?.user) {
                dispatch(setStatus({status: true}))
        
            }
            })

        sequence()
    }, [])

    async function sequence() {
        await animation.start({ opacity: 1, y: 20, transition: {duration: 1} })
        animation.start({ y: [20, -20], 
            transition: {
                repeat: Infinity, 
                ease: 'easeInOut',
                repeatType: 'reverse',
                duration: 1.5
            } })

    }

    

    return (
        <>
            <ScrollToTop/>
            <div className='error-wrapper'>
                <div className='error-container'>
                    <AnimatePresence>
                        <motion.img 
                        initial={{opacity: 0}} 
                        animate={animation}
                        src="https://unix-shop.s3.ap-southeast-1.amazonaws.com/ghost.webp" alt="Ghost" className='error-image'></motion.img>
                    </AnimatePresence>
                    

                    <div className='error-texts'>
                        <p className='error-404'>Error 404</p>
                        <h1>Oops sorry</h1>
                        <p className='error-message'>The page that you’re looking for doesn’t exist, maybe it is still in progress. Who knows? </p>

                        <div className='error-home' onClick={handleHome}><p>HOME</p></div>
                    </div>
                </div>
            </div>
        </>
    )
    }

export default Error;
