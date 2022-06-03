import React from 'react'
import './Market.css'
import { MarketItem } from '../../components'

const Market = ({ marketplace, nft, setModalOpen }) => {
  return (
    <div>
        <MarketItem marketplace={marketplace} nft={nft} setModalOpen={setModalOpen} />
    </div>
  )
}

export default Market