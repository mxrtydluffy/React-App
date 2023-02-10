import React from 'react';
import data from './sfpopos-data.json';
import POPOSSpace from "./POPOSSpace";
import './POPOSList.css';

function POPOSList() {
    const spaces = data.map(( { title, address, images, hours } ) => {
        return (
            <POPOSSpace
                name={title}
                address={address}
                image={images[0]}
                hours={hours}
            />
        )
    })

    return (
        <div className="POPOSList">
          { spaces }
        </div>
    )
}
  
export default POPOSList