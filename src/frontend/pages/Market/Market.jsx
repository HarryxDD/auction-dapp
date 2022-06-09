import React from 'react'
import './Market.css'
import { MarketItem } from '../../components'

const Market = ({ marketplace, setModalOpen }) => {
  return (
    <div>
        <MarketItem marketplace={marketplace} setModalOpen={setModalOpen} />
    </div>
  )
}

export default Market