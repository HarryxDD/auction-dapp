import React from 'react'
import './Card.css'
import { ethers } from 'ethers'

const Card = ({ item }) => {
  return (
    <div className='app__card'>
        <div className='card__image'>
            <img src={item.image} alt="" />
        </div>
        <div className='card__info'>
            <div className='card__info-name'>
                <h4>{item.name}</h4>
            </div>
            <div className='card__info-bid'>
                <p>Initial Price</p>
                <h4>{ethers.utils.formatEther(item.totalPrice)} ETH</h4>
            </div>
        </div>
        <button>
            Place a bid
        </button>
    </div>
  )
}

export default Card