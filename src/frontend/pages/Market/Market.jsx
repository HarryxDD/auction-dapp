import React from 'react'
import './Market.css'
import { MarketItem } from '../../components'

const Market = ({ marketplace, nft, account }) => {
  return (
    <div>
        <MarketItem marketplace={marketplace} nft={nft} account={account} />
    </div>
  )
}

export default Market