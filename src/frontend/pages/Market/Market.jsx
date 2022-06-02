import React from 'react'
import './Market.css'
import { Collection } from '../../components'

const Market = ({ marketplace, nft, setModalOpen }) => {
  return (
    <div>
        <Collection marketplace={marketplace} nft={nft} setModalOpen={setModalOpen} />
    </div>
  )
}

export default Market