import React from 'react'
import spinnerGif from './spinner.gif';

 const spinner = () => {
  return (
    <div>
      <img src={spinnerGif} alt="Loading..." style={{margin: 'auto', display: 'block', width: '200px'}} />
    </div>
  )
}

export default spinner;