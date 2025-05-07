import React from 'react'

const Ourboardui = ({ data }) => {
    return (
        <>
            <div className="p-3">
                <div className='p-3 w-full shadow-[0_0px_10px_0px_gray] rounded-lg '>
                    <div className="flex flex-row gap-2 justify-center place-items-start">
                        {data?.image ?
                            <img loading="lazy" id="profile_5" src={`${data?.image_path}`}
                                className="aspect-square w-48 object-cover" alt="" />
                            :
                            <img loading="lazy" id="profile_5" src={`https://ui-avatars.com/api/?name=${data?.name}&size=20`}
                                className="aspect-square w-48 object-cover" alt="" />
                        }
                        <div className="flex flex-col gap-1 w-full place-items-start">
                            {data?.name &&
                                <h1 className='font-semibold text-lg'><span className='font-normal text-sm'>Name : </span>{data?.name}</h1>
                            }
                            {data?.desegregation &&
                                <span className='text-sm'><span className='font-normal text-sm'>Desegregation : </span>{data?.desegregation}</span>
                            }
                            {data?.email &&
                                <span className='text-sm'><span className='font-normal text-sm'>E-mail : </span>{data?.email}</span>
                            }
                            {data?.mobile &&
                                <span className='text-sm'><span className='font-normal text-sm'>Mobile No. : </span>{data?.mobile}</span>
                            }
                            {data?.city &&
                                <span className='text-sm'><span className='font-normal text-sm'>City : </span>{data?.city}</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Ourboardui
