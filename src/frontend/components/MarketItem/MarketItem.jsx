import React from 'react'
import { useState, useEffect } from 'react'
import './MarketItem.css'
import Card from '../Card/Card'

import { Link } from 'react-router-dom'

const MarketItem = ({ marketplace, nft, setModalOpen }) => {

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const loadMarketplaceItems = async () => {
      const itemCount = await marketplace.itemCount()
      let items = []
      for (let i = 1; i <= itemCount; i++) {
          const item = await marketplace.items(i)
          if(!item.sold) {
              const uri = await nft.tokenURI(item.tokenId)
              const response = await fetch(uri)
              const metadata = await response.json()
              const totalPrice = await marketplace.getTotalPrice(item.itemId)
              items.push({
                  totalPrice,
                  itemId: item.itemId,
                  seller: item.seller,
                  name: metadata.name,
                  description: metadata.description,
                  image: metadata.image
              })
          }
      }
      setItems(items)
      setLoading(false)
  }

  useEffect(() => {
    loadMarketplaceItems()
  }, [])

  return (
    <div className='app__marketitem'>
        <div className='app__marketitem-title'>
            Market
            <span>Find your favorite NFT</span>
        </div>
        {items.length > 0
            ? (
          <div className='app__marketitem-items'>
              {items.map((item, idx) => (
                <Card key={idx} item={item} setModalOpen={setModalOpen} />
              ))}
          </div>
        ) : (
          <div className='app__marketitem-items'>
            <h2>
              No NFT
            </h2>
          </div>
        )
      }
    </div>
  )
}

export default MarketItem