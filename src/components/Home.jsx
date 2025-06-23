import React from 'react'
import { useState } from 'react';
const Home = () => {
    const [title, setTitle] = useState('')


  return (
    <div>
      <input className='home-input'
      type="text" 
     placeholder='Enter Title Here'
     value={title}
     onChange={(e)=> setTitle(e.target.value)}
      />

      <button>Create My Paste</button>
    </div>
  )
}

export default Home
