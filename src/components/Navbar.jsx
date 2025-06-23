import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='Navbar'>
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>

      <NavLink to="/pastes" className="nav-link">
        Pastes
      </NavLink>
    </div>
  )
}

export default Navbar
