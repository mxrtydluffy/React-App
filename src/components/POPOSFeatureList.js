import React from 'react'
import './POPOSFeatureList.css'
import POPOSFeature from './POPOSFeature'

function POPOSFeatureList(props) {
	const icons = props.features.map((feature) => {
    return <POPOSFeature key={feature} name={feature} />
  })
	return <div className="POPOSFeatureList">{icons}</div>
}

export default POPOSFeatureList