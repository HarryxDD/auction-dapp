import React from 'react'
import { useState, useEffect } from 'react'
import './Collection.css'
import { Card } from '../../../components'

const Collection = ({ marketplace, nft, setModalOpen }) => {

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const loadMarketplaceItems = async () => {
      const itemCount = await marketplace.itemCount()
      let items = []
      for (let i = 1; i <= itemCount; i++) {
          const item = await marketplace.items(i)
          if(!item.sold) {
              // get uri url from nft contract
              const uri = await nft.tokenURI(item.tokenId)
              // use uri to fetch the nft metadata stored on ipfs
              const response = await fetch(uri)
              const metadata = await response.json()
              // get total price of item (item price + fee)
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
    <div className='app__collection'>
        <div className='app__collection-title'>
            Collections
            <p>Browse our items -&gt;</p>
        </div>
        {items.length > 0
            ? (
          <div className='app__collection-items'>
              {items.map((item, idx) => (
                <Card key={idx} item={item} setModalOpen={setModalOpen} />
              ))}
          </div>
        ) : (
          <div className='app__collection-items'>
            <h2>
              No NFT
            </h2>
          </div>
        )
      }
    </div>
  )
}

export default Collection