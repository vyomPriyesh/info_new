import React from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const Labelinput = ({ error, label, value, type, onChange, placeholder, pass, view, setView }) => {
    return (
        <>
            {pass ?
                <div className="flex flex-col gap-2">
                    <span className='text-sm text-neutral-500'>{label}</span>
                    <div className="flex flex-row justify-between place-items-center px-3 py-2 rounded-lg border focus-within:border-black border-neutral-400">
                        <input type={view ? 'text' : 'password'} onChange={onChange} value={value} placeholder={placeholder} className='focus:outline-none text-sm ' />
                        <button onClick={() => setView(!view)} className='text-lg aspect-square h-full'>{view ? <FiEyeOff /> : <FiEye />}</button>
                    </div>
                    {error && <p className='text-red-500 text-sm'>{error}</p>}
                </div>
                :
                <div className="flex flex-col gap-2">
                    <span className='text-sm text-neutral-500'>{label}</span>
                    <input type={type} onChange={onChange} value={value} placeholder={placeholder} className='focus:outline-none text-sm px-3 py-2 rounded-lg border focus:border-black border-neutral-400' />
                    {error && <p className='text-red-500 text-sm'>{error}</p>}
                </div>
            }
        </>
    )
}

export default Labelinput