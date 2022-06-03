import React from 'react'
import './Item.css'
import { ethers } from 'ethers'

const Item = ({ marketplace, item }) => {

  const endMarketItem = async (item) => {
    await (await marketplace.end(item.itemId)).wait()
  }

  return (
    <div className='app__item'>
        <div className='item__image'>
            <img src={item.image} alt="" />
        </div>
        <div className='item__info'>
            <div className='item__info-name'>
                <h4>{item.name}</h4>
            </div>
            <div className='item__info-bid'>
                <p>Initial Price</p>
                <h4>{ethers.utils.formatEther(item.totalPrice)} ETH</h4>
            </div>
        </div>
        <button onClick={() => endMarketItem(item)}>
            End
        </button>
    </div>
  )
}

export default Item