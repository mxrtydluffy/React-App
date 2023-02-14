import React from 'react'
import { useParams } from 'react-router'
import './POPOSDetails.css'
import data from '../../sfpopos-data.js'
import POPOSFeatureList from '../POPOSFeatureList.js'

function POPOSDetails() {
    const params = useParams()
    const { id } = params
    const { images, title, desc, hours, features, geo } = data[id]

    return (
        <div className='POPOSDetails'>
          <div className='POPOSDetails-image'>
            <img src={`${process.env.PUBLIC_URL}/images/${images[0]}`} alt={title} />
          </div>
          <div className='POPOSDetails-info'>
            <h1 className='POPOSDetails-title'>{ title }</h1>
            <p className='POPOSDDetails-desc'>{ desc }</p>
            <p className='POPOSDetails-hours'>{ hours }</p>
            <POPOSFeatureList features={features} />
            <p className='POPOSDetails-geo'>{ geo.lat } { geo.lon }</p>
          </div>
    
        </div>
    )
}

export default POPOSDetails;