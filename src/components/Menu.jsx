import React, { act } from 'react'
import { Link } from 'react-router-dom'
import { useMyContext } from '../context/Allcontext'

const Menu = ({ menu, first }) => {

  const { setOurdata, setReporterdata, setActive, setRefresh, active } = useMyContext();


  const handleClick = (list) => {
    setActive(list)
    setOurdata()
    setRefresh(prev => prev + 1)
    setReporterdata()
  }



  return (
    <>
      {first ?
        <div className='flex flex-row gap-1 overflow-x-auto text-nowrap heading pt-1 ps-1 pb-1'>
          {first &&
            <Link to='/' onClick={() => handleClick(0)} className={`${active == 0 ? 'text-black border-black ' : 'text-red-500 border-red-500'} px-3  border-2 rounded-md font-medium text-sm md:text-base`}>Home</Link>
          }
          {menu.map((list, i) => (
            <Link onClick={() => handleClick(list.to)} key={i} to={`/?id=${list.to}`} className={` ${active != list.to ? 'text-red-500  border-red-500' : 'border-black'} px-3 border-2 rounded-md font-medium text-sm md:text-base`}>{list.name}</Link>
          ))}
        </div>
        :
        <div className='flex flex-row gap-1 overflow-y-auto text-nowrap heading pt-1.5 ps-1 pb-1'>
          {menu.map((list, i) => (
            <Link key={i} to={`/cms/${list.slug}`} className='text-red-500 px-3 border-red-500 border-2 rounded-md font-medium text-sm md:text-base'>{list.name}</Link>
          ))}
        </div>
      }
    </>
  )
}

export default Menu