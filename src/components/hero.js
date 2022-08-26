import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { nextSlide } from '../features/slideSlice'

import '../style/hero.scss'

// IMAGES
import image1 from '../images/hero.png';
import image2 from '../images/page2.png';
import image3 from '../images/page3.png';

import deal1 from '../images/me.png';
import deal2 from '../images/joy.png';

const Hero = () => {
    const slide = useSelector((state) => state.nextSlide.value)
    const dispatch = useDispatch();

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

    return (

        <>
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
                                    <img className='hero-image' src={image1}></img>
    
                                </div>

                                <div className='page2-container car-child'>
                                    <div className='page2-headings'>
                                        <h2 className='unique'>UNIQUE AND PREMIUM STYLES</h2>
                                        <h1 className='affordable'>AFFORDABLE</h1>

                                        <div className='page2-button'>EXPLORE</div>
                                    </div>
                                    <img className='page2-image' src={image2}></img>
                                </div>

                                <div className='page3-container car-child'>
                                    <div className='page3-headings'>
                                        <h2 className='quality'>MADE FROM QUALITY MATERIALS</h2>
                                        <h1 className='ordernow'>ORDER NOW</h1>

                                        <div className='page3-button'>EXPLORE</div>
                                    </div>
                                    <img className='page3-image' src={image3}></img>
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
                            <img src={deal2} className="deal1-image deal-image"></img>
                            <div className='tag1 tags'>
                                HOT DEALS
                            </div>
                            <p className="under">UNDER</p>
                            <h1 className='deal-price'>₱150</h1>
                            <p className='shopnow'>Shop now</p>

                            
                        </div>
                        <div className='deal2 deals'>
                            <img src={deal1} className="deal2-image deal-image"></img>
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
                </div>
            </div>
        </>
    )
}

export default Hero;