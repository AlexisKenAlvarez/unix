import React from 'react'
import { motion } from 'framer-motion'

import '../style/loader.scss'


const Loader = () => {
  return (
    <>
        <div className='loader-wrapper'>
            <motion.div exit={{opacity: 0, transition: {duration: 0.5}}} className='loader-container'></motion.div>
            <motion.img initial={{scale: 2, opacity: 0}} animate={{opacity: 1,scale: 1, transition: {delay: 0.2, duration: 0.5}}} exit={{opacity: 0, transition: {duration: 1}}} src="https://ik.imagekit.io/efpqj5mis/Unix/logowhite_zKyXIU_yc.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1664769963991" className='loader-image'></motion.img>
        </div>
    </>
  )
}

export default Loader
