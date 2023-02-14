import React, { useState } from 'react';
import data from '../../sfpopos-data.js';
import POPOSSpace from '../POPOSSpace/POPOSSpace';
import './POPOSList.css';

function POPOSList() {
    const [ query, setQuery ] = useState('');
    const spaces = data.filter((obj) => {
      const inTitle = obj.title.toLowerCase().includes(query.toLowerCase())
      const inAddress = obj.address.toLowerCase().includes(query.toLowerCase())
      return inTitle || inAddress })
    .map(({ title, address, images, hours, id} ) => {
      return (
        <POPOSSpace
          id={id}
          key={`${title}-${id}`} 
          name={title}
          address={address}
          image={images[0]}
          hours={hours}
        />
      )
    })

    return (
        <>  
            <div className='topnav'>
                <form>
                    <input
                        value={query}
                        placeholder="search"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button id='list-button' type="submit">search</button>
                </form>
            </div>

            <div className='POPOSList'>
                {spaces}
            </div>
        </>
        )
    }
      
export default POPOSList;