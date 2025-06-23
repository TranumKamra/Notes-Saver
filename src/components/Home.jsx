import React from 'react'
import { useState } from 'react';

import { useSearchParams } from 'react-router-dom';

const Home = () => {
    const [title, setTitle] = useState('')
    const [value, setValue] = useState('')
    const [SearchParams, setSearchParams] = useSearchParams();
    const pasteId=SearchParams.get("pasteId");



  return (
    <div className='home-container'>
        <div className='home'>
      <input className='home-input'
      type="text" 
     placeholder='Enter Title Here'
     value={title}
     onChange={(e)=> setTitle(e.target.value)}
      />

      <button>
        {
            pasteId ? "Update My Paste" : "Create My Paste"
        }
       

      </button>
    </div>

    <div>
        <textarea className='textarea'
        value={value}
        placeholder='Enter Content here'
        onChange={(e)=> setValue(e.target.value)}
        rows={20}
        
        />
    </div>
    </div>
  )
}

export default Home
