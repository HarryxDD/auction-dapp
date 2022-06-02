import React from 'react'
import './Navbar.css'

import { Link } from 'react-router-dom'

const Navbar = ({ web3Handler, account }) => {
  return (
    <div className='app__navbar'>
        <div className='app__navbar-logo'>
            <Link to='/'>Game-NFT</Link>
        </div>
        <div className='app__navbar-menu'>
            <div className='navbar__links'>
                <ul>
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/market"><li>Collections</li></Link>
                    <Link to="/aboutus"><li>About</li></Link>
                </ul>
            </div>
            <div className='navbar__connect'>
                {account ? (
                    <a
                        href={`https://etherscan.io/address/${account}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button nav-button btn-sm mx-4">
                        <button>
                            {account.slice(0, 5) + '...' + account.slice(38, 42)}
                        </button>

                    </a>
                ) : (
                    <button onClick={web3Handler}>Connect Wallet</button>
                )}
                
            </div>
        </div>
    </div>
  )
}

export default Navbar