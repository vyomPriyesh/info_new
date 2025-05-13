import React from 'react'
import loader from '../assets/loader.gif'

const Loader = () => {
  return (
    <>
      <div className="fixed h-full w-full bg-black opacity-75" style={{ zIndex: 998 }}>
      </div>
      <div style={{ zIndex: 999 }} className="fixed h-full w-full flex justify-center place-items-center ">
        <img src={loader} alt="" className='h-20 w-20' />
      </div>
    </>
  )
}

export default Loader