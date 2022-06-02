import React from 'react'
import './Collection.css'
import { Card } from '../../../components'

const Collection = () => {
  return (
    <div className='app__collection'>
        <div className='app__collection-title'>
            Collections
            <p>Browse our items -&gt;</p>
        </div>
        <div className='app__collection-items'>
            <Card />
            <Card />
            <Card />
        </div>
    </div>
  )
}

export default Collection