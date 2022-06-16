import React from 'react'
import { useState, useEffect } from 'react'
import './MarketItem.css'
import Card from '../Card/Card'
import Item from '../Item/Item'
import { Link } from 'react-router-dom'


const MarketItem = ({ marketplace, account, setModalOpen }) => {

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [created, setCreated] = useState([])
  

  const loadMarketplaceItems = async () => {
      const itemCount = await marketplace.itemCount()
      let items = []
      for (let i = 1; i <= itemCount; i++) {
          const item = await marketplace.items(i)
          if(!item.sold) {
              const uri = await marketplace.tokenURI(item.tokenId)
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

  const loadCreatedItems = async () => {
      const filter = marketplace.filters.Offered(null, null, null, account)
      const results = await marketplace.queryFilter(filter)

      const purchases = await Promise.all(results.map(async i => {

          i = i.args
          const uri = await marketplace.tokenURI(i.tokenId)
          const response = await fetch(uri)
          const metadata = await response.json()
          const totalPrice = await marketplace.getTotalPrice(i.itemId)
          let purchasedItem = {
              totalPrice,
              price: i.price,
              itemId: i.itemId,
              name: metadata.name,
              description: metadata.description,
              image: metadata.image
          }

          return purchasedItem
      }))
      setLoading(false)
      setCreated(purchases)
  }

  useEffect(() => {
    loadMarketplaceItems()
    loadCreatedItems()
  }, [])

  return (
    <div>
      
      <div className='app__marketitem'>
          <div className='app__marketitem-title'>
              Market
              <span>Find your favorite NFT</span>
          </div>
          {items.length > 0
              ? (
            <div className='app__marketitem-items'>
                {items.map((item, idx) => (
                  <Card key={idx} item={item} marketplace={marketplace} />
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

      <div className='app__owneditem'>
        <div className='app__owneditem-title'>
            Owned NFT
            <span>Your purchased assets</span>
        </div>
        {items.length > 0
            ? (
          <div className='app__owneditem-items'>
              {created.map((item, idx) => (
                <Item key={idx} marketplace={marketplace} item={item} />
              ))}
          </div>
        ) : (
          <div className='app__owneditem-items'>
            <h2>
              No NFT
            </h2>
          </div>
        )
        }
      </div>
    </div>

  )
}

export default MarketItem