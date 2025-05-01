import React from 'react'
import loader from '../assets/loader.gif'

const Loader = () => {
  return (
    <>
      <div className="fixed h-full z-50 w-full bg-black opacity-75">
      </div>
      <div className="fixed h-full z-50 w-full flex justify-center place-items-center ">
        <img src={loader} alt="" className='h-20 w-20' />
      </div>
    </>
  )
}

export default Loader