import React from 'react'
import './Market.css'
import { MarketItem } from '../../components'

const Market = ({ marketplace, account, setModalOpen }) => {
  return (
    <div>
        <MarketItem marketplace={marketplace} account={account} setModalOpen={setModalOpen} />

    </div>
  )
}

export default Market