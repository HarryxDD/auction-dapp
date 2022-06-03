import React from 'react'
import { useState } from 'react'
import './Card.css'
import Modal from '../Modal/Modal'
import { ethers } from 'ethers'

const Card = ({ item, marketplace }) => {

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      {modalOpen && <Modal marketplace={marketplace} setModalOpen={setModalOpen} item={item} />}
      <div className='app__card'>
          <div className='card__image'>
              <img src={item.image} alt="" />
          </div>
          <div className='card__info'>
              <div className='card__info-name'>
                  <h4>{item.name}</h4>
              </div>
              <div className='card__info-bid'>
                  <p>Current bid</p>
                  <h4>{ethers.utils.formatEther(item.totalPrice)} ETH</h4>
              </div>
          </div>
          <button className="openModalBtn" onClick={() => {
            setModalOpen(true);
          }}>
              Place a bid
          </button>
      </div>
    </div>
    
  )
}

export default Card