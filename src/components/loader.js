import React from 'react'
import { motion } from 'framer-motion'

import '../style/loader.scss'


const Loader = () => {
  return (
    <>
        <motion.div exit={{opacity: 0, transition: {duration: 0.5}}} className='loader-container'>
            <motion.img initial={{scale: 2, opacity: 0}} animate={{opacity: 1,scale: 1, transition: {delay: 0.2, duration: 0.5}}} exit={{opacity: 0, transition: {duration: 1}}} src="https://unix-shop.s3.ap-southeast-1.amazonaws.com/logowhite.png" className='loader-image'></motion.img>
        </motion.div>
    </>
  )
}

export default Loader
