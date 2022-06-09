import React from 'react'
import './Home.css'
import { About, Banner, Collection, Header } from '../../components'

const Home = ({ marketplace }) => {
  return (
    <div>
        <Header />
        <About />
        <Collection marketplace={marketplace} />
        <Banner />
    </div>
  )
}


export default Home