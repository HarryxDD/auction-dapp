import React from 'react'
import images from '../../../constants/images'
import './Header.css'

import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='app__header'>
        <div className='app__header-info'>
            <div className='header__info'>
                <h1>Create, Sell & Collect Your Own Creative NFT</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit.</p>
                <div className='header__info-buttons'>
                    <button className='buttons-explore'><Link to="/market">Explore Now</Link></button>
                    <button className='buttons-sell'><Link to="/create">Sell NFT</Link></button>
                </div>
                <div className='header__info-stats'>
                    <div className='stats-artworks stats'>
                        <h3>37k+</h3>
                        <span>Artworks</span>
                    </div>
                    <div className='stats-artists stats'>
                        <h3>20k+</h3>
                        <span>Artists</span>
                    </div>
                    <div className='stats-artworks stats'>
                        <h3>99k+</h3>
                        <span>Aucations</span>
                    </div>
                </div>
            </div>
            <div className='header__images'>
                <img src={images.header} alt="" srcset="" />
            </div>
        </div>
        <div className='app__header-tech'>
            <div className='binance-logo header__tech'>
                <img src={images.binancelogo} alt="" />
            </div>
            <div className='ethereum-logo header__tech'>
                <img src={images.ethereumlogo} alt="" />
            </div>
            <div className='blockchain-logo header__tech'>
                <img src={images.blockchainio} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Header