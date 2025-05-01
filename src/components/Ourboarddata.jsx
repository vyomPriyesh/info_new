import React from 'react'
import { useMyContext } from '../context/Allcontext';

const Ourboarddata = () => {

    const { ourData } = useMyContext();
    return (
        ourData &&
        <div className="p-3">
            <div className='p-3 w-full shadow-[0_0px_10px_0px_gray] rounded-lg '>
                
                <div className="flex flex-row gap-2 justify-center place-items-start">
                    {ourData?.image ?
                        <img loading="lazy" id="profile_5" src={`${ourData?.image_path}`}
                            className="aspect-square w-48 object-cover" alt="" />
                        :
                        <img loading="lazy" id="profile_5" src={`https://ui-avatars.com/api/?name=${ourData?.name}&size=20`}
                            className="aspect-square w-48 object-cover" alt="" />
                    }
                    <div className="flex flex-col gap-1 w-full place-items-start">
                        {ourData?.name &&
                            <h1 className='font-semibold text-lg'><span className='font-normal text-sm'>Name : </span>{ourData?.name}</h1>
                        }
                        {ourData?.designation &&
                            <span className='text-sm'><span className='font-normal text-sm'>Designation : </span>{ourData?.designation}</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ourboarddata
