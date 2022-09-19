import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import Axios from 'axios'

import '../style/cart.scss'

// COMPONENTS
import Delete from './delete'


// IMAGES 
import Minus from '../images/cart/minus.svg'
import Add from '../images/cart/add.svg'

// SLICES
import { getItems } from '../features/productSlice'
import { setStatus } from '../features/statusSlice'
import { handleCart, setTotal, setChecked, setAmount, setCheckOut, toDelete, deleteName } from '../features/cartSlice'
import { toggleVisible, showAnimate } from '../features/deleteSlice'


const Cart = () => {
  const dispatch = useDispatch();
  const deleteStatus = useSelector((state) => state.del.value)
  const totalPrice = useSelector((state) => state.cartSlice.total)
  const checkOutProduct = useSelector((state) => state.cartSlice.checkOut)
  const isChecked = useSelector((state) => state.cartSlice.checked)


  const products = useSelector((state) => state.prodSlice.value)

  const [checkedAll, setCheckedAll] = useState(false)
  const [loading, setLoading] = useState(false)

  const [prodName, setProdName] = useState(null);

  const [allSelected, setAllSelected] = useState(false)
  const [inputCheck, setInputCheck] = useState(null)


  Axios.defaults.withCredentials = true

  componentDidMount() {
    // GET PRODUCTS AND STORE IT TO PRODUCTS SLICE
    Axios.post("https://unix.herokuapp.com/products").then((response) => {
      dispatch(getItems({items: response.data.items}))
      
    })
  }

  useEffect(() => {
    const path = window.location.pathname

    dispatch(setStatus({ status: true }))

    if (path === '/cart') {
      dispatch(handleCart({ onCart: true }))
    } else {
      dispatch(handleCart({ onCart: false }))
    }



  }, [])
  

  useEffect(() => {
    return () => {
      dispatch(setTotal({value: 0}))
      dispatch(handleCart({ onCart: false }))

    }
}, [])

  // HANDLE CHECKBOX OF EVERY INPUT
  const handleChange = (e) => {
    const isActive = e.target.checked
    const productName = e.currentTarget.id

    // FOR CHECKOUT
    let total = 0
    let itemDetails = {}

    if (isActive) {
      // IF CHECKBOX IS ACTIVE, IT WILL GET ITS TOTAL
      products.items.forEach((items) => {
        if (productName === items.productName) {
          total = total + items.total
        }
      })

      // ADD THE ITEM IN CHECKOUT LIST
      itemDetails['productName'] = productName
      itemDetails['total'] = total
      dispatch(setCheckOut({itemDetails}))

      products.items.forEach((items) => { // GET THE TOTAL PRICE OF ITEMS
        if (items.productName === productName) {
          dispatch(setTotal({value: totalPrice.value + items.total})) // ADD TOTAL VALUE TO THE TOTAL 
        }
      })

      // IF AN ITEM IS CHECKED, THE DELETE WILL DO A MINUS TO THE TOTAL
      dispatch(setChecked({value: isChecked.value + 1}))

      
    } else {

      // REMOVE THE ITEM IN THE CHECKOUT LIST
      dispatch(toDelete(productName))

      products.items.forEach((items) => { // MINUS THE TOTAL
        if (items.productName === productName) {
          dispatch(setTotal({value: totalPrice.value - items.total})) 
        }
      })

      // IF AN ITEM UNCHECKS
      dispatch(setChecked({value: isChecked.value - 1}))


    }
  }

  const handleQuantity = (e) => {
    const action = e.currentTarget.id
    const productName = e.currentTarget.parentNode.getAttribute("data-key");
    setLoading(true)
    setProdName(productName)

    Axios.post("https://unix.herokuapp.com/handleQuantity", {action: action, productName: productName}).then((response) => {

      if (action === "add") {
        if (isChecked.value > 0) {
          dispatch(setTotal({value: totalPrice.value + response.data.price})) // ADD VALUE TO THE TOTAL
        }
      } else if (action === "minus") {
        if (response.data?.Action === "Delete") { // IF THE REQUEST SENDS A DElETE ACTION, HAPPENS WHEN QUANTITY IS ONLY 1 AND YOU DECREASE QUANTITY
          dispatch(toggleVisible({visible: true}))
          dispatch(showAnimate({ state: false }))
        } else {
          if (isChecked.value > 0) {
            dispatch(setTotal({value: totalPrice.value - response.data.price})) // MINUS VALUE FROM THE TOTAL
          }
          
        }
        
      }

      // RE RENDER PRODUCTS
          // GET PRODUCTS AND STORE IT TO PRODUCTS SLICE
          Axios.post("https://unix.herokuapp.com/products").then((response) => {
            dispatch(getItems({items: response.data.items}))
            setLoading(false)
    
          })
    })
  }

  const handleDelete = (e) => {
    const productName = e.currentTarget.id
    
    dispatch(toggleVisible({visible: true}))
    dispatch(deleteName({name: productName}))

    products.items.forEach((items) => {
      if (items.productName === productName) {
        dispatch(setAmount({value: items.total}))
      }
    })

    dispatch(showAnimate({ state: false }))

    

  }

  const printCheckout = () => {
    checkOutProduct.value.forEach((items) => {
      console.log(items.itemDetails)
    })
  }

  // HANDLER FOR SELECT ALL BUTTON
  const selectAll = (e) => {
    const isActive = e.target.checked
    let total = 0

    if (isActive) {
      products.items.forEach((items) => { // GET THE TOTAL PRICE OF ITEMS
        total = total + items.total
      })

      setCheckedAll(true) // DISABLE ALL CHECKBOX WHEN SELECT ALL IS CHECKED
      dispatch(setTotal({value: total})) // SET THE TOTAL PRICE OF ITEMS

      setInputCheck(true) // CHECKS ALL INPUT

      dispatch(setChecked({value: 100}))

    } else {
      dispatch(setTotal({value: 0}))
      setCheckedAll(false)
      setInputCheck(null) // UNCHECK ALL CHECKED INPUTS

      dispatch(setChecked({value: 0}))
    }
  }


  return (
    <>
      <AnimatePresence>
        {deleteStatus.visible ? <Delete /> : null}
      </AnimatePresence>

      <section className='cart-section'>
        <div className='cart-container'>
          <div className='cart-titles'>

            <div className='product-title-div'>
              <h2>Product</h2>
            </div>

            <div className='product-prices-div'>
              <h2>Price</h2>
              <h2>Quantity</h2>
              <h2 className='titles-total'>Total</h2>
              <h2>Actions</h2>
            </div>
          </div>

          <div className='cart-items-container'>

            {products.items.map((items) => {

              const base64String = btoa(new Uint8Array(items.img.data.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
              }, '')
              )

              return (
                <div className='cart-items' key={items.productName}>
                  <div className='cart-product-div'>

                    <input className='cart-check' checked={inputCheck} type="checkbox" id={items.productName} onChange={handleChange} disabled={checkedAll ? true : false}></input>
                    <div className='cart-prod-img-container'>
                      <img alt="Products" src={`data:image/webp;base64,${base64String}`} />
                    </div>
                    <h1 className='cart-product-name'>{items.productName}</h1>
                  </div>

                  <div className='cart-right'>
                    <p className='cart-price'>₱{items.price}</p>

                    <div className='cart-quantity-container' data-key={items.productName} style={prodName === items.productName ? loading ? {opacity: '0.5'} : {opacity: '1'} : null}>
                      <div className='cart-minus' id="minus" onClick={loading ? null : handleQuantity}><img className='cart-minus-img' alt="Minus" src={Minus}></img></div>
                      <div className='cart-quantity'>{items.quantity}</div>
                      <div className='cart-add' id="add" onClick={loading ? null : handleQuantity}><img className='cart-add-img' alt="Add" src={Add}></img></div>
                    </div>
                    
                    <p className='cart-total'>₱{items.total}</p>
                    <p className='cart-delete' onClick={handleDelete} id={items.productName}>Delete</p>
                  </div>
                  <div className='cart-line'></div>
                </div>
              )
            })}

          </div>
        </div>

        <div className='checkout-wrapper'>
          <div className='checkout-container'>
            <div className='selectall-container'>
              <input type="checkbox" className='cart-selectall-box' onChange={selectAll} checked={allSelected ? true : null}></input>
              <p className='selectall-text'>Select All</p>
            </div>

            <div className='cart-checkout'>
              <h1 className='cart-total'>Total: <span>₱{totalPrice.value}</span></h1>
              <div className='checkout-button' onClick={printCheckout}>Checkout</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Cart;