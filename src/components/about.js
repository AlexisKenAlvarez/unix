import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'

// STYLE
import '../style/about.scss'

// IMAGES
import Messenger from '../images/about/Messenger.svg'
import Gmail from '../images/about/Gmail.svg'

// COMPONENTS
import { setStatus } from '../features/statusSlice'
import ScrollToTop from '../ScrollToTop'
import { toggleActive } from '../features/navSlice.js'


const About = () => {
    Axios.defaults.withCredentials = true

    const dispatch = useDispatch()

    useEffect(() => {

        Axios.get(`${process.env.REACT_APP_DBURL}login`).then((response) => {
            if (response.data?.user) {
                dispatch(setStatus({status: true}))
      
            }
          })
    }, [])
    

    const portraitVariants = {
        initial1: {
            y: -30,
            height: 0,
            delay: 0.1,

        },
        animate1: {
            y: 0,
            height: "18%",
            transition: {
                delay: 0.1,
                duration: 2,
                type: "spring",
                stiffness: 100
            },
        },

        initial2: {
            y: 30,
            height: 0,
            delay: 0.1,

        },
        animate2: {
            y: 0,
            height: "18%",
            transition: {
                delay: 0.1,
                duration: 2,
                type: "spring",
                stiffness: 100
            },
        },

        hover1: {
            y: 0,
            height: "50%",
            transition: {
                duration: 0.5
            }
        },

        hover2: {
            y: 0,
            height: "50%",
            transition: {
                duration: 0.5
            }
        }
    }

    const [onHover, setHover] = useState(false)

    const handleOnHover = () => {
        setHover((current) => !current)
    }

    const handleNotHover = () => {
        setHover((current) => !current)
    }


    return (
        <>
            <ScrollToTop/>
            <motion.div className='about-wrapper' initial={{width: 0}} animate={{width: "100%"}} exit={{x: window.innerWidth}} transition={{delay: 0.2}}>
                <div className='about-container'>
                    <div className='about-image-container'>
                        <motion.div variants={portraitVariants} initial="initial1" animate={onHover ? "hover1" : "animate1"} className='abt-img-line1'></motion.div>
                        <img onMouseEnter={handleOnHover} onMouseLeave={handleNotHover} src="https://ik.imagekit.io/efpqj5mis/Unix/meAbout_1GKpdGl5n.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1664769964150" className='about-image' alt="Developer"></img>
                        <motion.div variants={portraitVariants} initial="initial2"animate={onHover ? "hover2" : "animate2"} className='abt-img-line2'></motion.div>
                    </div>


                    <div className='about-header'>
                        <h1 className='about-h1'>About us</h1>
                        <motion.h1 initial={{opacity: 0}} animate={{opacity: 1, transition:{duration: 1, delay: 0.5}}} className='about-unix'>UNIX</motion.h1>
                    </div>

                    <div className='about-info-container'>
                        <p className='about-p1 about-p'>
                        Unix is a e-commerce website inspired by shopee. We sell fictional products which doesn’t really exist. We only used photoshop mockups for our products. A friend of mine who’s name is <i>Aaron Joshua Espinosa</i> made all of the mockups, while I designed and wrote the code for the website and its system.
                        </p>

                        <p className='about-p2 about-p'>I created this website as my personal project to enhance my skills on MERN stack and practice website designing. Some of its features might not be available because I only focused on the system which is the cart system.</p>

                        <p className='about-p3 about-p'>Incase you find any bugs (minor or major), or has any suggestions, just contact me through the links below. 
                        </p>

                        <div className='abt-contact-container'>
                            <img className='abt-messenger' alt="messenger" src={Messenger}></img>
                            <img className='abt-gmail' alt="gmail" src={Gmail}></img>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
  )
}

export default About