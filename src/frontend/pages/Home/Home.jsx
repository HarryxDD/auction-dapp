import React from 'react'
import './Home.css'
import { About, Banner, Collection, Header } from '../../components'

const Home = () => {
  return (
    <div>
        <Header />
        <About />
        <Collection />
        <Banner />
    </div>
  )
}


export default Home