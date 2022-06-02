import React from 'react'
import './Market.css'
import { Collection } from '../../components'

const Market = ({ marketplace, nft }) => {
  return (
    <div>
        <Collection marketplace={marketplace} nft={nft} />
    </div>
  )
}

export default Market