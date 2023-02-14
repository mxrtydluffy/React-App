import React from 'react';
import { NavLink } from 'react-router-dom';
// import './Title.css';

function Title() {
    return (
      <header>
        <div className='Title'>
          <h1>SFPOPOS</h1>
          <div className="Title-Subtitle">
            <h2>San Francisco Privately Owned Public Spaces</h2>
          </div>
        </div>
      </header>
    )
}

export default Title