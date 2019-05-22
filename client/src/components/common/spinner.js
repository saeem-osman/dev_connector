import React from 'react'
import spinnerGif from './spinner.gif';

 const spinner = () => {
  return (
    <div>
      {/* <img src={spinnerGif} alt="Loading..." style={{margin: 'auto', display: 'block', width: '200px'}} /> */}
      <i className="fa fa-spin fa-refresh"></i>
    </div>
  )
}

export default spinner;