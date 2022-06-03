import React from 'react'
import { useState } from 'react'
import './Modal.css'

const Modal = ({ marketplace, setModalOpen, item }) => {

  const [bid, setBid] = useState()
  const bidMarketItem = async (item) => {
    await (await marketplace.bid(item.itemId, { value: bid })).wait()
  }

  return (
    <div className="modal__background">
      <div className="modal__container">
        <div className="modal__close">
          <button
            onClick={() => {
                setModalOpen(false);
            }}
          >
            X
          </button>
        </div>
        <div className="modal__title">
          <h1>Place a bid</h1>
        </div>
        <div className='modal__subtitle'>
            You must bid at least ... ETH
        </div>
        <input 
            className="form-field" 
            placeholder='Place a bid' 
            onChange={(e) => setBid(e.target.value)} 
            name='bid'
        />
        <button 
          className='modal__placebid'
          onClick={() => bidMarketItem(item)}
        >Confirm</button>
      </div>
    </div>
  )
}

export default Modal