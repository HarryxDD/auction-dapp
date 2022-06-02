import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='app__footer'>
      <div className='footer__general'>
        <div className='app__footer-info'>
          <h3 className='footer__title footer__info-name'>
            GAME-NFT
          </h3>
          <p>
            The best NFT marketplace website in the word and feel your experience in selling or buy our work
          </p>
        </div>
        <div className='app__footer-about app__footer-items'>
          <h3 className='footer__title'>
            About
          </h3>
          <ul className='footer__items'>
            <li>Product</li>
            <li>Resource</li>
            <li>Term & Condition</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className='app__footer-company app__footer-items'>
          <h3 className='footer__title'>
            Company
          </h3>
          <ul className='footer__items'>
            <li>Our Team</li>
            <li>Partner With Us</li>
            <li>Privacy & Policy</li>
            <li>Features</li>
          </ul>
        </div>
        <div className='app__footer-contact app__footer-items'>
          <h3 className='footer__title'>
            Contact
          </h3>
          <ul className='footer__items'>
            <li>+012 345 6789</li>
            <li>hungbede@gmail.com</li>
            <li>harrytruong1772@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className='footer__credit'>
        Created by <span>Hung</span> & <span>Harry</span> | All Right Reserved
      </div>
    </div>
  )
}

export default Footer