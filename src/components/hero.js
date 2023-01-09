import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useDraggable } from "react-use-draggable-scroll";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// SLICES
import { nextSlide } from '../features/slideSlice'
import { setStatus } from '../features/statusSlice'
import { getItems } from '../features/productSlice'
import { handleCart } from '../features/cartSlice'

import '../style/hero.scss'
import Cart from '../images/animation_300_l7nbf08m.gif'

// COMPONENTS
import ScrollToTop from '../ScrollToTop';
import Axios from 'axios';
import Loader from './loader';

const Hero = () => {
    const navigate = useNavigate()
    const ref = useRef();

    // STATES
    const [pop, setPop] = useState(false)
    const [email, setEmail] = useState('')
    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(true)

    const { events } = useDraggable(ref, {
        isMounted: true, 
        applyRubberBandEffect: true, // activate rubber band effect
      });

    const slide = useSelector((state) => state.nextSlide.value)
    const dispatch = useDispatch();
    Axios.defaults.withCredentials = true;



    const handleNext = () => {
        if (slide.page >= 3) {
            dispatch(nextSlide({ page: 1}))
        } else {
            dispatch(nextSlide({ page: slide.page + 1}))
        }
    }

    const handlePrev = () => {
        if (slide.page <= 1) {
            dispatch(nextSlide({ page: 3 }))
        } else {
            dispatch(nextSlide( {page: slide.page - 1 }))
        }
    }

    useEffect(() => {
        dispatch(handleCart({onCart: false}))

        // TO SET LOGGEDIN STATUS
        Axios.get(`${process.env.REACT_APP_DBURL}login`).then((response) => {
        if (response.data.loggedIn === true) {
            const userEmail = response.data.user[0].email
            dispatch(setStatus({status: true}))
            setEmail(userEmail)

            renderCart(userEmail)

        }   
        })

        Axios.get(`${process.env.REACT_APP_DBURL}getproducts`).then((response) => {
            setProducts(response.data.Products)
            setLoader(false)
        })

    }, [])


    const addCart = (event) => {
        const itemName = event.currentTarget.id

        Axios.post(`${process.env.REACT_APP_DBURL}addtocart`, {product: itemName}).then((response) => {
            console.log("3")
                if (response.data.loggedIn === false) {
                    navigate("/login", {replace: true})
                } else {
                    setPop(true)

                    setTimeout(() => {
                        setPop(false)
                    }, 1400);

                    renderCart(email)


                }
            })
    }

    const renderCart = (email) => {
        Axios.post(`${process.env.REACT_APP_DBURL}products`).then((response) => {
            const items = response.data.items

            dispatch(getItems({items: items}))
        })
    }

    const popVariants = {
        pop: {
            scale: 1,
            transition: {
                delay: 0.2,
                type: "spring",
                duration: 0.5
            }
        },

        hidden: {
            scale: 0,
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
        }
    }

    const addDone = (
        <>
            <motion.div className="cart-bg"
            variants={popVariants} initial="opacOut" animate="opacIn" exit="opacOut">
                <motion.div className="check-container"
                variants={popVariants} initial="hidden" animate="pop" exit="hidden">
                    <img src={Cart} className="cart-check" alt="Cart"></img>
                    <h1 className="poppins cart-text">Item has been added to your cart.</h1>
                </motion.div>
            </motion.div>
        </>
    )

    return (

        <>
            <AnimatePresence>
                {pop ? addDone : null}
                {loader ? <Loader key="loader"/> : null}
            </AnimatePresence>
            <ScrollToTop/>
            
            <div className='hero-wrapper'>
                <div className='hero-container'>
                    <p className='categ'>CATEGORIES</p>

                    {/* MAIN CAROUSEL WRAPPER */}
                    <section className='carousel-outside'>
                        <div className='carousel-wrapper'>

                            {/* THE DIV THAT MOVES LEFT AND RIGHT THAT ACTS AS CAROUSEL */}
                            <div className='carousel-mover' style={
                                slide.page === 1 ? {marginLeft: '0'} :
                                slide.page === 2 ? {marginLeft: '-100%'} :
                                slide.page === 3 ? {marginLeft: '-200%'} : {marginLeft: '0%'}
                            }>
                                <div className='hero-container car-child'>
                                    <div className='hero-headings'>
                                        <h2 className='coolest'>THE COOLEST STYLES ARE HERE</h2>
                                        <h1 className='off'>50% OFF</h1>

                                        <div className='hero-button'>EXPLORE</div>
                                    </div>
                                    <img className='hero-image' src="https://ik.imagekit.io/efpqj5mis/Unix/page1_HUUpHp6dA.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1664769963919" alt="Model"></img>
    
                                </div>

                                <div className='page2-container car-child'>
                                    <div className='page2-headings'>
                                        <h2 className='unique'>UNIQUE AND PREMIUM STYLES</h2>
                                        <h1 className='affordable'>AFFORDABLE</h1>

                                        <div className='page2-button'>EXPLORE</div>
                                    </div>
                                    <img className='page2-image' src="https://ik.imagekit.io/efpqj5mis/Unix/page2_esOl8rJ26n.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1664769964058" alt="Model"></img>
                                </div>

                                <div className='page3-container car-child'>
                                    <div className='page3-headings'>
                                        <h2 className='quality'>MADE FROM QUALITY MATERIALS</h2>
                                        <h1 className='ordernow'>ORDER NOW</h1>

                                        <div className='page3-button'>EXPLORE</div>
                                    </div>
                                    <img className='page3-image' src="https://ik.imagekit.io/efpqj5mis/Unix/page3_jEEmRWWV3S.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1664769964047" alt="Model"></img>
                                </div>
                            </div>
                        </div>

                        <div className='arrow-left arrow' onClick={handlePrev}></div>
                        <div className='arrow-right arrow' onClick={handleNext}></div>

                        <div className='dots-container'>
                            <div className='dot1 dots' style={slide.page === 1 ? {backgroundColor: 'white'} : {backgroundColor: 'rgba(98, 106, 121, 0.5)'}}></div>
                            <div className='dot2 dots' style={slide.page === 2 ? {backgroundColor: 'white'} : {backgroundColor: 'rgba(98, 106, 121, 0.5)'}}></div>
                            <div className='dot3 dots' style={slide.page === 3 ? {backgroundColor: 'white'} : {backgroundColor: 'rgba(98, 106, 121, 0.5)'}}></div>
                        </div>
                    </section>

                    <section className='deals-container'>
                        <div className='deal1 deals'>
                            <img src="https://ik.imagekit.io/efpqj5mis/Unix/joyitems_n3JsEx1WsJ.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1664769964027" className="deal1-image deal-image" alt="Deals"></img>
                            <div className='tag1 tags'>
                                HOT DEALS
                            </div>
                            <p className="under">UNDER</p>
                            <h1 className='deal-price'>₱150</h1>
                            <p className='shopnow'>Shop now</p>

                            
                        </div>
                        <div className='deal2 deals'>
                            <img src="https://ik.imagekit.io/efpqj5mis/Unix/meitems_zwl0Dsx9I.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1664769963890" className="deal2-image deal-image"  alt="Deals"></img>
                            <div className='tag2 tags'>
                                HOT DEALS
                            </div>
                            <p className="under">UNDER</p>
                            <h1 className='deal-price'>₱200</h1>
                            <p className='shopnow'>Shop now</p>
                            

                        </div>
                        <div className='deal3 deals'>
                            <div className='tag3 tags'>
                                HOT DEALS
                            </div>
                            <p className="under">UNDER</p>
                            <h1 className='deal-price'>₱250</h1>
                            <p className='shopnow'>Shop now</p>

                        </div>

                    </section>

                    {/* ARRIVAL ITEMS CONTAINER */}
                    <section className='arrival'>
                        <p className='new'>NEW ARRIVALS</p>
                        <div className='arrival-line'></div>

                        <div className='arrival-items-container' {...events} ref={ref}>

                            {/* ARRIVAL ITEMS */}
                            <div className='arrival-items-mover'>

                                {products.map((product) => {

                                    const base64String = btoa(new Uint8Array(product.img.data.data).reduce(function (data, byte) {
                                        return data + String.fromCharCode(byte);
                                    }, '')
                                    )

                                    return (
                                        <div className='arrival-items' key={product._id}>
                                            <div className='arr-image-outside' id={product.productName} onClick={addCart}>
                                                <div className='arrival-image'>
                                                    <img src={`data:image/webp;base64,${base64String}`} className="arrival-real-image" alt="Product"/>
                                                </div>
                                            </div>
                                            
                                            <p className='arrival-name'>{product.productName}</p>
                                            <div className='arrival-price-container'>
                                                <p className='ar-strike'>₱{product.oldprice}.00</p>
                                                <p className='ar-price'>₱{product.price}.00</p>
                                            </div>
                                        </div>
                                    )
  
                                })}
                                



                            </div>

                        </div>
                    </section>
                </div>
            </div>

        </>
    )
}

export default Hero;