import React from 'react'
import './Card.css'
import images from '../../constants/images'

const Card = () => {
  return (
    <div className='app__card'>
        <div className='card__image'>
            <img src={images.bot} alt="" />
        </div>
        <div className='card__info'>
            <div className='card__info-name'>
                <h4>Kantanna</h4>
            </div>
            <div className='card__info-bid'>
                <p>Current Bid</p>
                <h4>0.005 ETH</h4>
            </div>
        </div>
        <button>
            Place a bid
        </button>
    </div>
  )
}

export default Card