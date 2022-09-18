import React from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import Axios from 'axios'



// SLICE
import { toggleVisible, showAnimate } from '../features/deleteSlice'
import {  setTotal, setSomethingDeleted } from '../features/cartSlice'
import { getItems } from '../features/productSlice'



const DeleteInner = () => {

    Axios.defaults.withCredentials = true


    const amountDeduct = useSelector((state) => state.cartSlice.amount)
    const total = useSelector((state) => state.cartSlice.total)
    const somethingDeleted = useSelector((state) => state.cartSlice.somethingDeleted)
    const isChecked = useSelector((state) => state.cartSlice.checked)
    const totalPrice = useSelector((state) => state.cartSlice.total)
    const deleteThis = useSelector((state) => state.cartSlice.itemToDelete)


    const dispatch = useDispatch();

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
          scale: 0,
          transition: {
            duration: 0.2
          }
        }
    }


    const handleDelete = () => {
        const productToDelete = deleteThis.name

        Axios.post("http://localhost:3001/delete", {productName: productToDelete}).then((response) => {

            dispatch(showAnimate({ state: true }))

            setTimeout(() => {
            dispatch(toggleVisible({ visible: false }))
            
            }, 1500);

            Axios.post('http://localhost:3001/products').then((response) => {
                const items = response.data.items
                let itemList = []
        
                items.forEach((item) => {
                  itemList.push(item)
                })
        
                dispatch(getItems({ items: itemList }))

                if (isChecked.value > 0) {
                  dispatch(setTotal({value: totalPrice.value - amountDeduct.value}))
                }



              })
        })
        }

    const handleClose = () => {
        dispatch(toggleVisible({ visible: false }))
    }

  return (
    <motion.div key="delete" className='delete-container' variants={deleteVariants} initial="hidden" animate="pop" exit="exitFast">
        <motion.div className='del-text-container' variants={deleteVariants} exit="exitFast">
            <p className='ask-remove-text'>Do you want to remove this item?</p>
            <p className='instruc-remove-text' >Click "Delete" button below to confirm.</p>
        </motion.div>
        <motion.div className='del-buttons-container' variants={deleteVariants} exit="exitFast">
            <div className='del-cancel-button' onClick={handleClose}>Cancel</div>
            <div className='del-del-button' onClick={handleDelete}>Delete</div>
        </motion.div>
    </motion.div>
  )
}

export default DeleteInner
