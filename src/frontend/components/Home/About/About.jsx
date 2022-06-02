import React from 'react'
import images from '../../../constants/images'
import './About.css'

import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className='app__about'>
        <div className='app__about-title'>
            About Us
        </div>
        <div className='app__about-info'>
            <div className='about__image'>
                <img src={images.about} alt="about" />
            </div>
            <div className='about__desc'>
                <h3>Get Popular NFT</h3>
                <p>NFT is divided into land plots which exists as NFTs on the blockchain where users can freely trade their ownership. <br /><br />
                Users can land on this 3D lunar surface to explore and interact freely on this. <br /><br />
                Landowners can enjoy passive income generated from their ownership. These incomes are created from various economic activities such as building, creating and play-to-earn experiences.</p>
                <button><Link to="/aboutus">Show more</Link></button>
            </div>
        </div>
    </div>
  )
}

export default About