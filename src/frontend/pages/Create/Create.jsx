import React from 'react'
import './Create.css'

const Create = () => {
  return (
    <div className='app__create'>
        <form className='create-form'>
            <input value={""} className="form-field" placeholder='Name' name='name'/>
            <input value={""} className="form-field" placeholder='Description' name='description'/>
            <input value={""} className="form-field" placeholder='Price in ETH' name='price'/>
            <input value={""} type="file" id='file-form' className="form-file" placeholder='Choose Image' name='image'/>
            <label for="file-form">
              Choose a photo
            </label>
            <button>Create Your NFT</button>
        </form>
    </div>
  )
}

export default Create