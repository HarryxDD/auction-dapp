import React from 'react'
import './Home.css'
import { About, Banner, Collection, Header } from '../../components'

const Home = ({ marketplace, nft }) => {
  return (
    <div>
        <Header />
        <About />
        <Collection marketplace={marketplace} nft={nft} />
        <Banner />
    </div>
  )
}


export default Home