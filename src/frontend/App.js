import React from 'react'
import { useState, useEffect } from 'react'
import './App.css'
import { Footer, Navbar } from './components'
import { AboutUs, Create, Home, Market } from './pages'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link
} from 'react-router-dom';

import MarketplaceAbi from './contractsData/Marketplace.json'
import MarketplaceAddress from './contractsData/Marketplace-address.json'
import NFTAbi from './contractsData/NFT.json'
import NFTAddress from './contractsData/NFT-address.json'

import { ethers } from 'ethers';

const App = () => {

  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({})

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    })
    setAccount(accounts[0])
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    loadContracts(signer)
  }

  const loadContracts = async (signer) => {
    const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
    setMarketplace(marketplace)
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
    setNFT(nft)
    setLoading(false)
  }

  return (
    <Router>
      <div className='App'>
          <Navbar web3Handler={web3Handler} account={account}/>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/aboutus' element={<AboutUs />}/>
            <Route path='/market' element={<Market />}/>
            <Route path='/create' element={<Create />}/>
          </Routes>
          <Footer />
      </div>
    </Router>
    
  )
}

export default App