import React from 'react'
import './Hero.css'
import hand_icon from '../assets/hand_icon.png'
import arrow from '../assets/arrow.png'
import hero_image from '../assets/hero_image.png'

const Hero = () => {
  return (
    <div className='hero'>
      
      {/* LEFT SIDE CONTENT */}
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>

        <div className="hero-title">
          <p>new</p>
          <img src={hand_icon} alt="hand icon" />
        </div>

        <p className="hero-collections">collections</p>
        <p className="hero-for-everyone">for everyone</p>

        <div className="hero-latest-button">
          <span>Latest Collection</span>
          <img src={arrow} alt="arrow" />
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="hero-right">
        <img src={hero_image} alt="Hero" />
      </div>
    </div>
  )
}

export default Hero
