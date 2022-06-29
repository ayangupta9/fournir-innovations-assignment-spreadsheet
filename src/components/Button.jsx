import React from 'react'

const Button = ({ handleOnClick, buttonText }) => {
  return (
    <button className='btn btn-outline-dark' onClick={handleOnClick}>
      {buttonText}
    </button>
  )
}

export default Button
