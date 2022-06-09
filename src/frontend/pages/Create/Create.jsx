import React from 'react'
import { useState, useEffect } from 'react'
import './Create.css'
import { ethers } from "ethers"
import { create as ipfsHttpClient } from 'ipfs-http-client'
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const Create = ({ marketplace }) => {

  const [image, setImage] = useState('')
  const [price, setPrice] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  // const testInput = () => {
  //   console.log(name);
  // }

  // useEffect(() => {
  //   testInput()
  // });

  const uploadToIPFS = async (event) => {
      event.preventDefault()
      const file = event.target.files[0]
      if (typeof file !== 'undefined') {
          try {
              const result = await client.add(file)
              console.log(result)
              setImage(`https://ipfs.infura.io/ipfs/${result.path}`)
          } catch (err) {
              console.log("ipfs image upload error: ", err)
          }
      }
  }

  const createNFT = async (event) => {
      event.preventDefault()
      if (!image || !price || !name || !description) return 
      try {
          const result = await client.add(JSON.stringify({ image, name, description }))
          mintThenList(result)
      } catch (err) {
          console.log("ipfs uri upload error: ", err)
      }
  }

  const mintThenList = async (result) => {
      const uri = `https://ipfs.infura.io/ipfs/${result.path}`
      // mint nft
      const listingPrice = ethers.utils.parseEther(price.toString())
      await (await marketplace.mint(uri, listingPrice)).wait()
      // get tokenId of new nft
      const id = await marketplace.tokenCount()
  }

  return (
    <div className='app__create'>
        <form className='create-form'>
            <input 
              className="form-field" 
              placeholder='Name' 
              onChange={(e) => setName(e.target.value)} 
              name='name'
            />
            <input 
              className="form-field" 
              placeholder='Description' 
              onChange={(e) => setDescription(e.target.value)} 
              name='description'
            />
            <input 
              type="number" 
              className="form-field" 
              placeholder='Price in ETH' 
              onChange={(e) => setPrice(e.target.value)} 
              name='price'
            />
            <input 
              type="file" 
              id='file-form' 
              className="form-file" 
              placeholder='Choose Image' 
              onChange={uploadToIPFS}
              name='image'
            />
            <label for="file-form">
              Choose a photo
            </label>
            <button onClick={createNFT}>Create Your NFT</button>
        </form>
    </div>
  )
}

export default Create