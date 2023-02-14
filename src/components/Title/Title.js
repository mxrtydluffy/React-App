import React from 'react';
import { NavLink } from 'react-router-dom';
import './Title.css';
import RandomSpace from '../RandomSpace/RandomSpace';

function Title() {
  return (
    <div className='Title'>
    <header>
      <h1>SFPOPOS</h1>
      <h2><div className='Title-Subtitle'>San Francisco Privately Owned Public Open Spaces</div></h2>

      <div className='navBar'>
        <NavLink 
          className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link' }
          to="/">List</NavLink>
        <NavLink 
          className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link' }
          to="/about">About</NavLink>
        <RandomSpace />
      </div>
    </header>
  </div>
  )
}

export default Title;