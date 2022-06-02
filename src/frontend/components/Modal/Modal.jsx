import React from 'react'
import { useState } from 'react'
import './Modal.css'

const Modal = ({ setModalOpen }) => {

  const [bid, setBid] = useState()

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
        <button className='modal__placebid'>Confirm</button>
      </div>
    </div>
  )
}

export default Modal