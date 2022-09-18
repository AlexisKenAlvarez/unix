import React, {useState} from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import Axios from 'axios'

import '../style/delete.scss'

import Trash from '../images/cart/can.gif'

// Delete slice
import { toggleVisible } from '../features/deleteSlice'

// COMPONENTS
import DeleteInner from './deleteInner'


const Delete = () => {
  Axios.defaults.withCredentials = true

  const dispatch = useDispatch();
  const delAnimate = useSelector((state) => state.del.animate)
  
  const handleClose = () => {
    dispatch(toggleVisible({ visible: false }))
  }

  const deleteVariants = {
    pop: {
      scale: 1,
      borderRadius: "0%",
      width: "80%",
      rotate: "0deg",
      transition: {
          delay: 0.2,
          type: "spring",
          duration: 0.5
      }
    },

    hidden: {
        scale: 0,
        width: "5rem",
        rotate: "360deg",
        transition: {
            delay: 0.2,
            type: "tween",
            duration: 0.5
        } 
    },
    cancel: {
      scale: 0,
      width: "5rem",
      rotate: "0deg",
      transition: {
          delay: 0.2,
          type: "tween",
          duration: 0.5
      } 
    },
    opacIn: {
      opacity: 1,
      transition: {
          delay: 0.2,
          type: "tween",
          duration: 0.5
      } 
    },

    opacOut: {
        opacity: 0,
        transition: {
            delay: 0.2,
            type: "tween",
            duration: 0.5
        } 
    },

    exitFast: {
      opacity: 0,
      transition: {
        delay: 0.1,
        duration: 0.2
      }
    }
  }

  const trashVariant = {
    hidden: {
      scale: 0,
      transition: {
        duration: 0.5,
        delay: 0.2
      }

    },
    show: {
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.2
      }

    }
  }

  const trashgif = (
    <>
      <motion.div className='trash-gif-div' key="delete-gif" variants={trashVariant} initial="hidden" animate="show" exit="exitFast">
        <motion.img src={Trash} key="trash" alt="Trash can" className='trash-gif' variants={trashVariant} initial="hidden" animate="show" exit="exitFast"></motion.img>
      </motion.div>
      
    </>
  )

  return (
    <>
      
        <motion.section className='delete-wrapper' key="wrapper">
            <motion.div className='delete-closer' key="closer" variants={deleteVariants} initial="opacOut" animate="opacIn" exit="exitFast" onClick={handleClose}></motion.div>

              {delAnimate.state ? trashgif : <DeleteInner/>}

        </motion.section>
      
    </>
  )
}

export default Delete;
